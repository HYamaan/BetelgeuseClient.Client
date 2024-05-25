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
import OneFileUpload from "@/components/ui/Panel/OneFileUpload";

const CompanyLogosComponent = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector(state => state.courseInformation);
    const [CompanyLogos, setCompanyLogos] = useState([]);

    const [commentLogosButtons, setCommentLogosButtons] = useState({});

    const [file, setFile] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_SERVER}/Course/GetCourseLogoList?courseId=${courseInformation.courseId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`
                    }
                });

                if (response.data.succeeded) {
                    setCompanyLogos(response.data.data);
                } else {
                    console.error('Failed to fetch FAQ options:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching FAQ options:', error);
                if (error.response && error.response.status === 401) {
                    // await refreshToken();  // Token yenileme işlemini deneyin
                    alert("Please retry submit Logo options.");
                }
            }
        };

        fetchData();
    }, []);


    const handleClickNewMaterial = async () => {
        const newLogo = {
            id: nanoid(),
            isContentVisible: false,
            logoName: "New Item",
            logoUrl: "",
            order: 0,
            Image: []
        };

        const updatedMaterial = CompanyLogos.map(logo => ({
            ...logo,
            order: logo.order + 1,
        }));

        setCompanyLogos([newLogo, ...updatedMaterial]);
        toggleContent(0);
        await FetchUpdateFaqTypeOrder(CompanyLogos, courseInformation.courseId, AccordionType.CompanyLogo);
    };

    const onDragEnd = async (result) => {
        const {source, destination, type} = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedFaq = [...CompanyLogos];
            const [removedFaq] = reOrderedFaq.splice(source.index, 1);
            reOrderedFaq.splice(destination.index, 0, removedFaq);

            const updatedMaterial = reOrderedFaq.map((logo, index) => ({
                ...logo,
                order: index,
            }));

            setCompanyLogos(updatedMaterial);
            await FetchUpdateFaqTypeOrder(CompanyLogos, courseInformation.courseId, AccordionType.CompanyLogo);
        }
    };


    const handleClickSubmit = async (logoId) => {
        const filteredLogos = CompanyLogos.filter(logo => logo.id === logoId);
        const findIndex = CompanyLogos.findIndex(logo => logo.id === logoId);
        if (filteredLogos.length === 0) {
            alert("Logo not found.");
            return;
        }
        const filteredLogo = filteredLogos[0];

        if (!filteredLogo || !filteredLogo.Image) {
            alert("Title fields and image cannot be empty.");
            return;
        }

        // FormData oluştur
        const formData = new FormData();
        formData.append('courseId', courseInformation.courseId);
        formData.append('Image', filteredLogo.Image);
        formData.append('order', filteredLogo.order);

        try {
            const response = await axios.post(`${process.env.API_SERVER}/Course/UploadCompanyLogo`, formData, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.succeeded) {
                setCompanyLogos(prevLogos => {
                    const updatedMaterial = [...prevLogos];
                    if (findIndex !== -1) {
                        updatedMaterial[findIndex] = {
                            ...updatedMaterial[findIndex],
                            id: response.data.data.logoId,
                            logoUrl: response.data.data.logoUrl,
                            logoName: response.data.data.logoName,
                            order: response.data.data.order

                        };
                    }
                    return updatedMaterial;
                });
                toggleContent(findIndex);
                console.log("Logo successfully submitted.");
            } else {
                console.error("Failed to submit logo:", response.data.message);
            }
        } catch (error) {
            console.error("Error submitting logo:", error);
            if (error.response && error.response.status === 401) {
                // await refreshToken();  // Token yenileme işlemini deneyin
                alert("Please retry submitting the logo.");
            }
        }
    };


    const handleClickDelete = async (logoId) => {
        const resBody = {
            "courseId": courseInformation.courseId,
            "Id": logoId
        };

        try {
            const result = await axios.delete(`${process.env.API_SERVER}/Course/DeleteCompanyLogo`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                },
                data: resBody
            });
            if (result.data.succeeded) {
                setCompanyLogos(CompanyLogos.filter(logo => logo.id !== logoId));
            }
        } catch (error) {
            console.error("Error deleting FAQ option:", error);
            if (error.response && error.response.status === 401) {
                //await refreshToken();
                handleClickDelete(logoId);
            }
        }
    };

    const handleCommentButtonClick = (logoId) => {
        setCommentLogosButtons((prevButtons) => ({
            ...prevButtons,
            [logoId]: !prevButtons[logoId],
        }));
    };

    const toggleContent = (index) => {
        setCompanyLogos(currentFaq => currentFaq.map((logo, idx) => {
            if (idx === index) {
                return {...logo, isContentVisible: !logo.isContentVisible};
            }
            return logo;
        }));
    };

    const handleInputChange = (index, field, value) => {
        setCompanyLogos(currentPanels => currentPanels.map((panel, idx) => {
            if (idx === index) {
                return {...panel, [field]: value};
            }
            return panel;
        }));
    };


    return <div className={styles.learningMaterialSection}>
        <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>Company logos (Optional)</p>
        <div className={styles.faq_button}>
            <div className="button_dark mb-4" onClick={handleClickNewMaterial}>New Plan</div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {CompanyLogos.map((logo, index) => (
                            <Draggable key={logo.id} draggableId={logo.id} index={index}>
                                {(provided) => (
                                    <div {...provided.draggableProps} {...provided.dragHandleProps}
                                         ref={provided.innerRef}>
                                        <div className={styles.container_pricing_background}>
                                            <div className={styles.accordion_title}>
                                                <p>{logo.logoUrl.length === 0 ? "New Item" :
                                                    <img src={`/assets/${logo.logoUrl}`} alt={`${logo.logoName}`}
                                                         className={styles.logo}/>}</p>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <i className="fa-solid fa-up-down-left-right"></i>
                                                    <div className={panelCss.comment_button}>
                                                        <OutsideClickHandler
                                                            onOutsideClick={() => setCommentLogosButtons({})}
                                                        >
                                                            <HiDotsVertical
                                                                onClick={() => handleCommentButtonClick(logo.id)}
                                                            />
                                                            <div
                                                                className={`${panelCss.button_edit} ${commentLogosButtons[logo.id] ? panelCss.button_active : ''}`}
                                                            >
                                                                    <span
                                                                        onClick={() => handleClickDelete(logo.id)}>Delete</span>
                                                            </div>
                                                        </OutsideClickHandler>
                                                    </div>
                                                    <i className={`fa-solid fa-angle-down ${logo.isContentVisible ? 'rotate-180' : ''}`}
                                                       onClick={() => toggleContent(index)}></i>
                                                </div>
                                            </div>
                                            {
                                                logo.isContentVisible && (
                                                    <div className={styles.accordion_content}>
                                                        <p className={`${panelCss.specific_date_title} ${styles.marginBottom}`}>Image</p>
                                                        <OneFileUpload
                                                            file={logo.Image}
                                                            setFile={(newValue) => handleInputChange(index, 'Image', newValue)}
                                                            className={styles.uploadImage}
                                                        />

                                                        <div className={styles.buttonsSection}>
                                                            <button
                                                                className={`button_dark ${styles.button_close_content}`}
                                                                onClick={() => handleClickSubmit(logo.id)}>Submit
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

export default CompanyLogosComponent;
