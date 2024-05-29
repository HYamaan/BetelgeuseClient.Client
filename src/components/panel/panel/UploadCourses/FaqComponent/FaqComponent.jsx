import React, {useEffect, useState} from 'react';

import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import PanelInput from "@/components/ui/Panel/Input/Input";

import {useSelector} from "react-redux";
import panelCss from "@/components/panel/panel/panel.module.css";
import {useCookies} from "react-cookie";
import {refreshToken} from "@/lib/auth";
import axios from "axios";
import {nanoid} from 'nanoid';
import FetchUpdateFaqTypeOrder from "@/lib/fetch/fetchUpdateFaqTypeOrder";
import {AccordionType} from "@/enum/AccordionType";
import {Languages} from "@/enum/Languages";
import {toast} from "react-toastify";

const FaqComponent = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector(state => state.courseInformation);
    const [faqs, setFaqs] = useState([]);

    const [commentFaqButtons, setCommentFaqButtons] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_SERVER}/Course/GetCourseFaqList?courseId=${courseInformation.courseId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`
                    }
                });

                if (response.data.succeeded) {
                    setFaqs(response.data.data);
                } else {
                    console.error('Failed to fetch FAQ options:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching FAQ options:', error);
                if (error.response && error.response.status === 401) {
                    //await refreshToken();  // Token yenileme işlemini deneyin
                    alert("Please retry fetching FAQ options.");
                }
            }
        };

        fetchData();
    }, []);


    const handleClickNewFaq = async () => {
        const newFaq = {
            id: nanoid(),
            isContentVisible: false,
            languageId: 1,
            title: "",
            answer: "",
            order: 0,
        };

        const updatedFaqs = faqs.map(faq => ({
            ...faq,
            order: faq.order + 1,
        }));

        setFaqs([newFaq, ...updatedFaqs]);
        toggleContent(0);
        await FetchUpdateFaqTypeOrder(faqs, courseInformation.courseId, AccordionType.Faq);
    };

    const onDragEnd = async (result) => {
        const {source, destination, type} = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedFaq = [...faqs];
            const [removedFaq] = reOrderedFaq.splice(source.index, 1);
            reOrderedFaq.splice(destination.index, 0, removedFaq);

            const updatedFaqs = reOrderedFaq.map((faq, index) => ({
                ...faq,
                order: index,
            }));

            setFaqs(updatedFaqs);
            await FetchUpdateFaqTypeOrder(faqs, courseInformation.courseId, AccordionType.Faq);
        }
    };


    const handleClickSubmit = async (faqId) => {
        const filteredFaqs = faqs.filter(faq => faq.id === faqId);
        const findIndex = faqs.findIndex(faq => faq.id === faqId);
        if (filteredFaqs.length === 0) {
            alert("FAQ not found.");
            return;
        }
        const filteredFaq = filteredFaqs[0];

        if (!filteredFaq.title || !filteredFaq.answer) {
            alert("Title and Answer fields cannot be empty.");
            return;
        }

        const updatedFaq = {
            ...filteredFaq,
            courseId: courseInformation.courseId
        };
        delete updatedFaq.isContentVisible;
        delete updatedFaq.id;

        console.log("updatedFaq", updatedFaq);
        try {
            const response = await axios.post(`${process.env.API_SERVER}/Course/UploadFaqOption`, updatedFaq, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });

            if (response.data.succeeded) {

                setFaqs(prevFaqs => {
                    const updatedFaqs = [...prevFaqs];
                    if (findIndex !== -1) {
                        updatedFaqs[findIndex] = {
                            ...updatedFaqs[findIndex],
                            id: response.data.faqId
                        };
                    }
                    return updatedFaqs;
                });
                toggleContent(findIndex)
                console.log("FAQ successfully submitted.");
                toast.success("FAQ successfully submitted.")
            } else {
                console.error("Failed to submit FAQ:", response.data.message);
                toast.error("Failed to submit FAQ.")
            }
        } catch (error) {
            console.error("Error submitting FAQ:", error);
            if (error.response && error.response.status === 401) {
                await refreshToken();  // Token yenileme işlemini deneyin
                alert("Please retry submitting the FAQ.");
                toast.warn("Please retry submitting the FAQ.")

            }
        }
    };

    const handleClickDelete = async (faqId) => {
        const resBody = {
            "courseId": courseInformation.courseId,
            "faqId": faqId
        };

        try {
            const result = await axios.delete(`${process.env.API_SERVER}/Course/DeleteFaqOption`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                },
                data: resBody
            });
            if (result.data.succeeded) {
                setFaqs(faqs.filter(faq => faq.id !== faqId));
                toast.success("FAQ option deleted successfully.");
            }
        } catch (error) {
            console.error("Error deleting FAQ option:", error);
            toast.error("Failed to delete FAQ option.")
            if (error.response && error.response.status === 401) {
                await refreshToken();
                handleClickDelete(faqId);
            }
        }
    };


    const handleCommentButtonClick = (faqId) => {
        setCommentFaqButtons((prevButtons) => ({
            ...prevButtons,
            [faqId]: !prevButtons[faqId],
        }));
    };

    const toggleContent = (index) => {
        setFaqs(currentFaq => currentFaq.map((faq, idx) => {
            if (idx === index) {
                return {...faq, isContentVisible: !faq.isContentVisible};
            }
            return faq;
        }));
    };

    const handleInputChange = (index, field, value) => {
        setFaqs(currentPanels => currentPanels.map((panel, idx) => {
            if (idx === index) {
                return {...panel, [field]: value};
            }
            return panel;
        }));
    };

    return <div className={styles.faqSection}>
        <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>FAQ (Optional)</p>
        <div className={styles.faq_button}>
            <div className="button_dark mb-4" onClick={handleClickNewFaq}>New Plan</div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {faqs.map((faq, index) => (
                            <Draggable key={faq.id} draggableId={faq.id} index={index}>
                                {(provided) => (
                                    <div {...provided.draggableProps} {...provided.dragHandleProps}
                                         ref={provided.innerRef}>
                                        <div className={styles.container_pricing_background}>
                                            <div className={styles.accordion_title}>
                                                <p>{faq.title.length === 0 ? "New Pricing Plan" : faq.title}</p>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <i className="fa-solid fa-up-down-left-right"></i>
                                                    <div className={panelCss.comment_button}>
                                                        <OutsideClickHandler
                                                            onOutsideClick={() => setCommentFaqButtons({})}
                                                        >
                                                            <HiDotsVertical
                                                                onClick={() => handleCommentButtonClick(faq.id)}
                                                            />
                                                            <div
                                                                className={`${panelCss.button_edit} ${commentFaqButtons[faq.id] ? panelCss.button_active : ''}`}
                                                            >
                                                                    <span
                                                                        onClick={() => handleClickDelete(faq.id)}>Delete</span>
                                                            </div>
                                                        </OutsideClickHandler>
                                                    </div>
                                                    <i className={`fa-solid fa-angle-down ${faq.isContentVisible ? 'rotate-180' : ''}`}
                                                       onClick={() => toggleContent(index)}></i>
                                                </div>
                                            </div>
                                            {
                                                faq.isContentVisible && (
                                                    <div className={styles.accordion_content}>
                                                        <p className={panelCss.specific_date_title}>Language</p>
                                                        <select
                                                            className={panelCss.specific_input}
                                                            value={faq.languageId}
                                                            onChange={(e) => handleInputChange(index, 'languagId', Number(e.target.value))}
                                                        >
                                                            {Object.entries(Languages).map(([key, value]) => (
                                                                <option key={value} value={value}>{key}</option>
                                                            ))}
                                                        </select>

                                                        <p className={panelCss.specific_date_title}>Title</p>
                                                        <PanelInput
                                                            setInput={(newValue) => handleInputChange(index, 'title', newValue)}
                                                            value={faq.title}
                                                            isDefaultValue={faq.title}
                                                        />
                                                        <p className={panelCss.specific_date_title}>Answer</p>
                                                        <textarea
                                                            className={panelCss.specific_input}
                                                            rows={5}
                                                            defaultValue={faq.answer}
                                                            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                                                        />

                                                        <div className={styles.buttonsSection}>
                                                            <button
                                                                className={`button_dark ${styles.button_close_content}`}
                                                                onClick={() => handleClickSubmit(faq.id)}>Submit
                                                            </button>

                                                            <button
                                                                className={`button_close ${styles.button_close_content}`}
                                                                onClick={() => toggleContent(index)}>Close
                                                            </button>

                                                        </div>

                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
};

export default FaqComponent;
