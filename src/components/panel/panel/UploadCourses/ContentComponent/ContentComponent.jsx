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
import {CourseUploadSourceType} from "@/enum/CourseUploadSourceType";
import {Languages} from "@/enum/Languages";
import {CourseUploadFileType} from "@/enum/CourseUploadFileType";

import OneFileUpload from "@/components/ui/Panel/OneFileUpload";
import {Checkbox} from "@mui/material";
import InputLink from "@/components/ui/Panel/Input/InputLink";


const ContentComponent = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector(state => state.courseInformation);
    const [CourseSectionFile, setCourseSectionFile] = useState([]);
    const [sectionId, setSectionId] = useState("0315555c-d6dd-4415-b238-9787922009a4");

    const [commentLogosButtons, setCommentLogosButtons] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${process.env.API_SERVER}/Course/GetCourseLogoList?courseId=${courseInformation.courseId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${cookies.accessToken}`
    //                 }
    //             });
    //
    //             if (response.data.succeeded) {
    //                 setCourseSectionFile(response.data.data);
    //             } else {
    //                 console.error('Failed to fetch FAQ options:', response.data.message);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching FAQ options:', error);
    //             if (error.response && error.response.status === 401) {
    //                 // await refreshToken();  // Token yenileme işlemini deneyin
    //                 alert("Please retry submit Logo options.");
    //             }
    //         }
    //     };
    //
    //     fetchData();
    // }, []);


    const handleClickNewMaterial = async () => {
        const newSectionFile = {
            id: nanoid(),
            isContentVisible: false,
            source: CourseUploadSourceType.Upload,
            languageId: Languages.Turkish,
            title: "New Item",
            order: 0,
            description: "",
            isActive: false,
            isFree: false,
            link: "",
            fileType: CourseUploadFileType.Image,
            uploadFile: []
        };
        const updatedMaterial = CourseSectionFile.map(sectionFile => ({
            ...sectionFile,
            order: sectionFile.order + 1,
        }));

        setCourseSectionFile([newSectionFile, ...updatedMaterial]);
        toggleContent(0);
        await FetchUpdateFaqTypeOrder(CourseSectionFile, courseInformation.courseId, AccordionType.CompanyLogo);
    };

    const onDragEnd = async (result) => {
        const {source, destination, type} = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedFaq = [...CourseSectionFile];
            const [removedFaq] = reOrderedFaq.splice(source.index, 1);
            reOrderedFaq.splice(destination.index, 0, removedFaq);

            const updatedMaterial = reOrderedFaq.map((sectionFile, index) => ({
                ...sectionFile,
                order: index,
            }));

            setCourseSectionFile(updatedMaterial);
            await FetchUpdateFaqTypeOrder(CourseSectionFile, courseInformation.courseId, AccordionType.CompanyLogo);
        }
    };


    const handleClickSubmit = async (sourceId) => {
        const filteredSectios = CourseSectionFile.filter(sectionFile => sectionFile.id === sourceId);
        const findIndex = CourseSectionFile.findIndex(sectionFile => sectionFile.id === sourceId);
        if (filteredSectios.length === 0) {
            alert("Logo not found.");
            return;
        }
        const filteredSection = filteredSectios[0];

        if (!filteredSection || !filteredSection.uploadFile) {
            alert("Title fields and image cannot be empty.");
            return;
        }

        // FormData oluştur
        const formData = new FormData();
        formData.append('courseId', courseInformation.courseId);
        formData.append('sectionId', sectionId);
        formData.append('languageId', filteredSection.languageId);
        formData.append('title', filteredSection.title);
        formData.append('isFree', filteredSection.isFree);
        formData.append('source', filteredSection.source);
        formData.append('fileType', filteredSection.fileType);
        formData.append('description', filteredSection.description);
        formData.append('uploadFile', filteredSection.uploadFile);

        try {
            const response = await axios.post(`${process.env.API_SERVER}/Course/UploadSource`, formData, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.succeeded) {
                setCourseSectionFile(prevLogos => {
                    const updatedMaterial = [...prevLogos];
                    if (findIndex !== -1) {
                        updatedMaterial[findIndex] = {
                            ...updatedMaterial[findIndex],
                            id: response.data.data.id,
                        };
                    }
                    return updatedMaterial;
                });
                toggleContent(findIndex);
                console.log("Logo successfully submitted.");
            } else {
                console.error("Failed to submit sectionFile:", response.data.message);
            }
        } catch (error) {
            console.error("Error submitting sectionFile:", error);
            if (error.response && error.response.status === 401) {
                // await refreshToken();  // Token yenileme işlemini deneyin
                alert("Please retry submitting the sectionFile.");
            }
        }
    };


    const handleClickDelete = async (sourceId) => {
        const resBody = {
            "sourceId": sourceId,
        };

        try {
            const result = await axios.delete(`${process.env.API_SERVER}/Course/DeleteCourseSource`, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                },
                data: resBody
            });
            if (result.data.succeeded) {
                setCourseSectionFile(CourseSectionFile.filter(sectionFile => sectionFile.id !== sourceId));
            }
        } catch (error) {
            console.error("Error deleting FAQ option:", error);
            if (error.response && error.response.status === 401) {
                //await refreshToken();
                handleClickDelete(sourceId);
            }
        }
    };

    const handleCommentButtonClick = (sourceId) => {
        setCommentLogosButtons((prevButtons) => ({
            ...prevButtons,
            [sourceId]: !prevButtons[sourceId],
        }));
    };

    const toggleContent = (index) => {
        setCourseSectionFile(currentFaq => currentFaq.map((sectionFile, idx) => {
            if (idx === index) {
                return {...sectionFile, isContentVisible: !sectionFile.isContentVisible};
            }
            return sectionFile;
        }));
    };

    const handleInputChange = (index, field, value) => {
        setCourseSectionFile(currentPanels => currentPanels.map((panel, idx) => {
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
                        {CourseSectionFile.map((sectionFile, index) => (
                            <Draggable key={sectionFile.id} draggableId={sectionFile.id} index={index}>
                                {(provided) => (
                                    <div {...provided.draggableProps} {...provided.dragHandleProps}
                                         ref={provided.innerRef}>
                                        <div className={styles.container_pricing_background}>
                                            <div className={styles.accordion_title}>
                                                <div className={styles.accordion_title_left}>
                                                    <span> <i className="fa-regular fa-file"></i></span>
                                                    <p>{sectionFile.title.length === 0 ? "Add new File" : sectionFile.title}</p>

                                                </div>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <i className="fa-solid fa-up-down-left-right"></i>
                                                    <div className={panelCss.comment_button}>
                                                        <OutsideClickHandler
                                                            onOutsideClick={() => setCommentLogosButtons({})}
                                                        >
                                                            <HiDotsVertical
                                                                onClick={() => handleCommentButtonClick(sectionFile.id)}
                                                            />
                                                            <div
                                                                className={`${panelCss.button_edit} ${commentLogosButtons[sectionFile.id] ? panelCss.button_active : ''}`}
                                                            >
                                                                    <span
                                                                        onClick={() => handleClickDelete(sectionFile.id)}>Delete</span>
                                                            </div>
                                                        </OutsideClickHandler>
                                                    </div>
                                                    <i className={`fa-solid fa-angle-down ${sectionFile.isContentVisible ? 'rotate-180' : ''}`}
                                                       onClick={() => toggleContent(index)}></i>
                                                </div>
                                            </div>
                                            {
                                                sectionFile.isContentVisible && (
                                                    <div className={styles.accordion_content}>
                                                        <p className={panelCss.specific_date_title}>Language</p>
                                                        <select
                                                            className={panelCss.specific_input}
                                                            value={sectionFile.languageId}
                                                            onChange={(e) => handleInputChange(index, 'languagId', Number(e.target.value))}
                                                        >
                                                            {Object.entries(Languages).map(([key, value]) => (
                                                                <option key={value} value={value}>{key}</option>
                                                            ))}
                                                        </select>

                                                        <p className={panelCss.specific_date_title}>Title</p>
                                                        <PanelInput
                                                            setInput={(newValue) => handleInputChange(index, 'title', newValue)}
                                                            value={sectionFile.title}
                                                            isDefaultValue={sectionFile.title}
                                                        />
                                                        <p className={panelCss.specific_date_title}>Source</p>
                                                        <select
                                                            className={panelCss.specific_input}
                                                            value={sectionFile.source}
                                                            onChange={(e) => handleInputChange(index, 'source', Number(e.target.value))}
                                                        >
                                                            {Object.entries(CourseUploadSourceType).map(([key, value]) => (
                                                                <option key={value} value={value}>{key}</option>
                                                            ))}
                                                        </select>

                                                        {
                                                            (sectionFile.source === CourseUploadSourceType.Upload ||
                                                                sectionFile.source === CourseUploadSourceType.AmazonS3) && (
                                                                <>
                                                                    <p className={`${panelCss.specific_date_title} ${styles.marginBottom}`}>Image</p>
                                                                    <OneFileUpload
                                                                        file={sectionFile.uploadFile}
                                                                        setFile={(newValue) => handleInputChange(index, 'uploadFile', newValue)}
                                                                        className={styles.uploadImage}
                                                                    />

                                                                    <p className={panelCss.specific_date_title}>File
                                                                        Type</p>
                                                                    <select
                                                                        className={panelCss.specific_inputw2}
                                                                        value={sectionFile.fileType}
                                                                        onChange={(e) => handleInputChange(index, 'fileType', Number(e.target.value))}
                                                                    >
                                                                        {Object.entries(CourseUploadFileType).map(([key, value]) => (
                                                                            <option key={value} value={value}>{key}</option>
                                                                        ))}
                                                                    </select>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            (sectionFile.source === CourseUploadSourceType.iFrame ||
                                                                sectionFile.source === CourseUploadSourceType.Vimeo ||
                                                                sectionFile.source === CourseUploadSourceType.YouTube) && (
                                                                <div className="w-3/4">
                                                                    <InputLink
                                                                        title="Link"
                                                                        setInput={(newValue) => handleInputChange(index, 'link', newValue)}
                                                                        value={sectionFile.link}
                                                                        isDefaultValue={sectionFile.link}/>
                                                                </div>
                                                            )
                                                        }


                                                        <p className={panelCss.specific_date_title}>Description</p>
                                                        <textarea
                                                            className={panelCss.specific_input}
                                                            rows={5}
                                                            defaultValue={sectionFile.description}
                                                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                                        />
                                                        <div className={styles.checkbox_section}>
                                                            <p>Free</p>
                                                            <Checkbox checked={sectionFile.isFree}
                                                                      onChange={(e) => handleInputChange(index, 'isFree', e.target.checked)}
                                                            />
                                                        </div>
                                                        <div className={styles.checkbox_section}>
                                                            <p>Active</p>
                                                            <Checkbox checked={sectionFile.isActive}
                                                                      onChange={(e) => handleInputChange(index, 'isActive', e.target.checked)}
                                                            />
                                                        </div>
                                                        <div className={styles.buttonsSection}>
                                                            <button
                                                                className={`button_dark ${styles.button_close_content}`}
                                                                onClick={() => handleClickSubmit(sectionFile.id)}>Submit
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

export default ContentComponent;
