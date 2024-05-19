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

const LearningMaterialsComponent = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector(state => state.courseInformation);
    const [LearningMaterials, setLearningMaterials] = useState([]);

    const [commentMaterialButtons, setCommentMaterialButtons] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_SERVER}/Course/GetCourseLearningMaterialList?courseId=${courseInformation.courseId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`
                    }
                });

                if (response.data.succeeded) {
                    setLearningMaterials(response.data.data);
                } else {
                    console.error('Failed to fetch FAQ options:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching FAQ options:', error);
                if (error.response && error.response.status === 401) {
                    //await refreshToken();  // Token yenileme işlemini deneyin
                    //alert("Please retry fetching FAQ options.");
                }
            }
        };

        fetchData();
    }, []);


    const handleClickNewMaterial = async () => {
        const newFaq = {
            id: nanoid(),
            isContentVisible: false,
            languageId: 1,
            title: "",
            order: 0,
        };

        const updatedMaterial = LearningMaterials.map(faq => ({
            ...faq,
            order: faq.order + 1,
        }));

        setLearningMaterials([newFaq, ...updatedMaterial]);
        toggleContent(0);
        await FetchUpdateFaqTypeOrder(LearningMaterials, courseInformation.courseId, AccordionType.LearningMaterial);
    };

    const onDragEnd = async (result) => {
        const {source, destination, type} = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedFaq = [...LearningMaterials];
            const [removedFaq] = reOrderedFaq.splice(source.index, 1);
            reOrderedFaq.splice(destination.index, 0, removedFaq);

            const updatedMaterial = reOrderedFaq.map((faq, index) => ({
                ...faq,
                order: index,
            }));

            setLearningMaterials(updatedMaterial);
            await FetchUpdateFaqTypeOrder(LearningMaterials, courseInformation.courseId, AccordionType.LearningMaterial);
        }
    };


    const handleClickSubmit = async (faqId) => {
        const filteredFaqs = LearningMaterials.filter(faq => faq.id === faqId);
        const findIndex = LearningMaterials.findIndex(faq => faq.id === faqId);
        if (filteredFaqs.length === 0) {
            alert("FAQ not found.");
            return;
        }
        const filteredFaq = filteredFaqs[0];

        if (!filteredFaq.title) {
            alert("Title fields cannot be empty.");
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
            const response = await axios.post(`${process.env.API_SERVER}/Course/UploadLearningMaterial`, updatedFaq, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });

            if (response.data.succeeded) {

                setLearningMaterials(prevFaqs => {
                    const updatedMaterial = [...prevFaqs];
                    if (findIndex !== -1) {
                        updatedMaterial[findIndex] = {
                            ...updatedMaterial[findIndex],
                            id: response.data.Id
                        };
                    }
                    return updatedMaterial;
                });
                toggleContent(findIndex)
                console.log("FAQ successfully submitted.");
            } else {
                console.error("Failed to submit FAQ:", response.data.message);
            }
        } catch (error) {
            console.error("Error submitting FAQ:", error);
            if (error.response && error.response.status === 401) {
                await refreshToken();  // Token yenileme işlemini deneyin
                alert("Please retry submitting the FAQ.");

            }
        }
    };

    const handleClickDelete = async (faqId) => {
        const resBody = {
            "courseId": courseInformation.courseId,
            "Id": faqId
        };

        try {
            const result = await axios.delete(`${process.env.API_SERVER}/Course/DeleteLearningMaterial`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                },
                data: resBody
            });
            if (result.data.succeeded) {
                setLearningMaterials(LearningMaterials.filter(faq => faq.id !== faqId));
            }
        } catch (error) {
            console.error("Error deleting FAQ option:", error);
            if (error.response && error.response.status === 401) {
                await refreshToken();
                handleClickDelete(faqId);
            }
        }
    };


    const handleCommentButtonClick = (faqId) => {
        setCommentMaterialButtons((prevButtons) => ({
            ...prevButtons,
            [faqId]: !prevButtons[faqId],
        }));
    };

    const toggleContent = (index) => {
        setLearningMaterials(currentFaq => currentFaq.map((faq, idx) => {
            if (idx === index) {
                return {...faq, isContentVisible: !faq.isContentVisible};
            }
            return faq;
        }));
    };

    const handleInputChange = (index, field, value) => {
        setLearningMaterials(currentPanels => currentPanels.map((panel, idx) => {
            if (idx === index) {
                return {...panel, [field]: value};
            }
            return panel;
        }));
    };

    return <div className={styles.learningMaterialSection}>
        <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>Learning Material (Optional)</p>
        <div className={styles.faq_button}>
            <div className="button_dark mb-4" onClick={handleClickNewMaterial}>New Plan</div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {LearningMaterials.map((faq, index) => (
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
                                                            onOutsideClick={() => setCommentMaterialButtons({})}
                                                        >
                                                            <HiDotsVertical
                                                                onClick={() => handleCommentButtonClick(faq.id)}
                                                            />
                                                            <div
                                                                className={`${panelCss.button_edit} ${commentMaterialButtons[faq.id] ? panelCss.button_active : ''}`}
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

export default LearningMaterialsComponent;
