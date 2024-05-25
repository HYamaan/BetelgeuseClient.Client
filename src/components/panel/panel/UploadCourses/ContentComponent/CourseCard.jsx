import React, {useEffect, useState} from 'react';
import styles from "../New/New.module.css"
import panelCss from "@/components/panel/panel/panel.module.css";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import {LuPlus} from "react-icons/lu";
import {Languages} from "@/enum/Languages";
import {CourseUploadSourceType} from "@/enum/CourseUploadSourceType";
import {CourseUploadFileType} from "@/enum/CourseUploadFileType";
import {CiEdit} from "react-icons/ci";
import {nanoid} from "nanoid";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {FiGrid} from "react-icons/fi";
import CourseSource from "@/components/panel/panel/UploadCourses/ContentComponent/CourseSource";
import {Checkbox} from "@mui/material";
import PanelInput from "@/components/ui/Panel/Input/Input";
import axios from "axios";
import {toast} from "react-toastify";
import {refreshToken} from "@/lib/auth";
import {useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import isGuid from "@/lib/isGuid";
import {sources} from "next/dist/compiled/webpack/webpack";

const CourseCard = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector(state => state.courseInformation);

    const [section, setSection] = useState([])
    const [sectionInfoButtons, setSectionInfoButtons] = useState({});

    const [updateSectionId, setUpdateSectionId] = useState(null);
    const [createSectionLanguage, setCreateSectionLanguage] = useState(Languages.Turkish);
    const [createSectionTitle, setCreateSectionTitle] = useState("");
    const [createSectionActive, setCreateSectionActive] = useState(false);
    const [createSectionAllPass, setCreateSectionAllPass] = useState(false);
    const [createPopUpOpen, setCreatePopUpOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_SERVER}/Course/GetContent?courseId=${courseInformation.courseId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`
                    }
                });

                if (response.data.succeeded) {
                    console.log("response.data", response.data.data)
                    response.data.data.forEach((sectionFile, index) =>{
                        const newSectionFile = {};
                        newSectionFile.id = sectionFile.id;
                        newSectionFile.title = sectionFile.title;
                        newSectionFile.languageId = sectionFile.languageId;
                        newSectionFile.isActive = sectionFile.isActive;
                        newSectionFile.allPass = sectionFile.passAllParts;
                        newSectionFile.order = index;
                        newSectionFile.courseSource = []

                        sectionFile.courseTypes.forEach((source, srcIndex) => {
                            if(source.courseQuizzes == null){
                                const courseSource = source.courseSources;
                                const newSourceFile = {};
                                newSourceFile.id = source.id;
                                newSourceFile.isContentVisible = false;
                                newSourceFile.source = courseSource.source;
                                newSourceFile.languageId = courseSource.languageId;
                                newSourceFile.title = courseSource.title;
                                newSourceFile.order = srcIndex;
                                newSourceFile.description = courseSource.description;
                                newSourceFile.isActive = courseSource.isActive;
                                newSourceFile.isFree = courseSource.isFree;
                                newSourceFile.link = courseSource?.link;
                                newSourceFile.fileType = courseSource.fileType;
                                newSourceFile.uploadFile = courseSource.contentUpload;
                                newSectionFile.courseSource.push(newSourceFile);
                            }
                        });
                        setSection(prevState => [...prevState, newSectionFile]);
                    });

                } else {
                    console.error('Failed to fetch GetContent options:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching GetContent options:', error);
                if (error.response && error.response.status === 401) {
                    await refreshToken();
                 await setTimeout(async () => { await fetchData();}, 1000);
                    alert("Please retry fetching GetContent options.");
                }
            }
        };

        fetchData();
    }, []);
    console.log("source",sources);

    const newSectionFile = {
        id: nanoid(),
        isContentVisible: false,
        title: createSectionTitle,
        languageId: createSectionLanguage,
        isActive: createSectionActive,
        allPass: createSectionAllPass,
        order: 0,
        courseSource: []
    };

    const newSourceFile = {
        id: nanoid(),
        isContentVisible: false,
        source: CourseUploadSourceType.Upload,
        languageId: Languages.Turkish,
        title: "Add new file",
        order: 0,
        description: "",
        isActive: false,
        isFree: false,
        link: "",
        fileType: CourseUploadFileType.Image,
        uploadFile: []
    };
    const handleClickNewSection = async () => {
        if(updateSectionId !== null){
            handleClickEditSectionSubmit(updateSectionId);
            return;
        }
        const updatedMaterial = section.map(sectionFile => ({
            ...sectionFile,
            order: sectionFile.order + 1,
        }));

        const updatedAxios={
            ...newSectionFile,
            courseId: courseInformation.courseId,
        }
        delete updatedAxios.isContentVisible;
        delete updatedAxios.courseSource;
        delete updatedAxios.id;
        try {
            const response = await axios.post(`${process.env.API_SERVER}/Course/UploadSections`, updatedAxios, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });
            if (response.data.succeeded) {
                newSectionFile.id= response.data.id;
                setSection([newSectionFile, ...updatedMaterial]);
                handleCLickCloseSection();
                toggleSectionContent(0);
                toast.success("Succeeded")
            } else {
                console.error("Failed to submit :", response.data.message);
                toast.error("Failed to submit .")
            }
        } catch (error) {
            console.error("Error submitting :", error);
            if (error.response && error.response.status === 401) {
                await refreshToken();
                alert("Please retry submitting the .");
                toast.warn("Please retry submitting the .")

            }
        }


    };
    const handleClickEditSection = async (sectionId) => {
        const findSection = section.filter(sec => sec.id === sectionId);
        if(findSection.length !== 0){
            setUpdateSectionId(sectionId);
            setCreateSectionLanguage(findSection[0].languageId);
            setCreateSectionTitle(findSection[0].title);
            setCreateSectionActive(findSection[0].isActive);
            setCreateSectionAllPass(findSection[0].allPass);
            setCreatePopUpOpen(true);
        }

    }
    const handleClickEditSectionSubmit = async (sectionId) => {
        const updatedSection = section.map(sec => {
            if (sec.id === sectionId) {
                return {
                    ...sec,
                    title: createSectionTitle,
                    languageId: createSectionLanguage,
                    isActive: createSectionActive,
                    allPass: createSectionAllPass,
                };
            }

            return sec;
        });

        const updatedAxios={
            ...updatedSection["0"],
            courseId: courseInformation.courseId,
            courseSectionId: sectionId
        }
        delete updatedAxios.isContentVisible;
        delete updatedAxios.courseSource;
        delete updatedAxios.id;
        try {
            const response = await axios.put(`${process.env.API_SERVER}/Course/UpdateSection`, updatedAxios, {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`
                }
            });
            if (response.data.succeeded) {
                setSection(updatedSection);
                setUpdateSectionId(null);
                handleCLickCloseSection();
                toast.success(" successfully submitted.")
            } else {
                console.error("Failed to submit :", response.data.message);
                toast.error("Failed to submit .")
            }
        } catch (error) {
            console.error("Error submitting :", error);
            if (error.response && error.response.status === 401) {
                await refreshToken();
                alert("Please retry submitting the .");
                toast.warn("Please retry submitting the .")

            }
        }
    }

    const handleCLickCloseSection = () => {
        setCreatePopUpOpen(false);
        setCreateSectionLanguage(Languages.Turkish);
        setCreateSectionTitle("");
        setCreateSectionActive(false);
        setCreateSectionAllPass(false);
        setUpdateSectionId(null);
    }

    const toggleSectionContent = (index) => {
        setSection(currentFaq => currentFaq.map((section, idx) => {
            if (idx === index) {
                return {...section, isContentVisible: !section.isContentVisible};
            }
            return section;
        }));
    };

    const handleClickSectionDelete = async (id) => {
        if(!isGuid(id)){
            setSection(section.filter(sec => sec.id !== id));
        }else{
            const deletedAxios = {
                courseId: courseInformation.courseId,
                sectionId: id
            }

            try {
                const response = await axios.delete(`${process.env.API_SERVER}/Course/DeleteSection`, {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`
                    },
                    data: deletedAxios
                });
                if (response.data.succeeded) {
                    setSection(section.filter(sec => sec.id !== id));
                    toast.success(" successfully deleted.")
                } else {
                    console.error("Failed to submit :", response.data.message);
                    toast.error("Failed to submit .")
                }
            } catch (error) {
                console.error("Error submitting :", error);
                if (error.response && error.response.status === 401) {
                    await refreshToken();
                    alert("Please retry submitting the .");
                    toast.warn("Please retry submitting the .")

                }
            }
        }

    }
    const onDragEndSection = async (result) => {
        const {source, destination, type} = result;
        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) {
            return;
        }

        if (type === 'group') {
            const reOrderedFaq = [...section];
            const [removedFaq] = reOrderedFaq.splice(source.index, 1);
            reOrderedFaq.splice(destination.index, 0, removedFaq);

            const updatedMaterial = reOrderedFaq.map((sectionFile, index) => ({
                ...sectionFile,
                order: index,
            }));

            setSection(updatedMaterial);
        }
    };

    const handleCommentButtonClick = (sourceId) => {
        setSectionInfoButtons((prevButtons) => ({
            ...prevButtons,
            [sourceId]: !prevButtons[sourceId],
        }));
    };
    //-----------------------------------------------------------


    const handleClickNewSource = async (sectionId) => {
        const updatedSection = section.map(sec => {
            if (sec.id === sectionId) {
                const newOrder = sec?.courseSource.length;
                newSourceFile.order = newOrder + 1;
                return {
                    ...sec,
                    courseSource: [...sec?.courseSource, newSourceFile]
                };
            }
            return sec;
        });

        setSection(updatedSection);
        toggleContentSource(sectionId);

        // await FetchUpdateFaqTypeOrder(CourseSectionFile, courseInformation.courseId, SectionAccordionEnum.Chapter);
    };
    const toggleContentSource = (sectionIndex, sourceIndex) => {
        setSection(currentSections => currentSections.map((sec, secIdx) => {
            if (secIdx === sectionIndex) {
                const updatedCourseSources = sec.courseSource?.map((source, srcIdx) => {
                    if (srcIdx === sourceIndex) {
                        return {...source, isContentVisible: !source.isContentVisible};
                    }
                    return source;
                });
                return {...sec, courseSource: updatedCourseSources};
            }
            return sec;
        }));
    };

//--------------------------------------------------------
    const updateCourseSource = (sectionIndex, newCourseSource) => {
        setSection(currentSections => currentSections.map((sec, idx) => {
            if (idx === sectionIndex) {
                return {...sec, courseSource: newCourseSource};
            }
            return sec;
        }));
    };


    return <>
        <div className={styles.learningMaterialSection}>
            <p className={`${panelCss.specific_date_title} ${panelCss.after_inline}`}>Company logos (Optional)</p>
            <div className={styles.faq_button}>
                <div className="button_dark mb-4" onClick={() => setCreatePopUpOpen(true)}>New Plan</div>
                {
                    createPopUpOpen && (
                        <>
                            <div className={`${styles.popup}`}>
                                <OutsideClickHandler onOutsideClick={handleCLickCloseSection}>
                                    <div className={styles.popup_container}>
                                        <div className={styles.popup_container_content}>
                                            <p className={panelCss.specific_date_title}>Language</p>
                                            <select
                                                className={panelCss.specific_input}
                                                value={createSectionLanguage}
                                                onChange={(e) => setCreateSectionLanguage(e.target.value)}
                                            >
                                                {Object.entries(Languages).map(([key, value]) => (
                                                    <option key={value} value={value}>{key}</option>
                                                ))}
                                            </select>
                                            <p className={panelCss.specific_date_title}>Title</p>
                                            <PanelInput
                                                setInput={setCreateSectionTitle}
                                                value={createSectionTitle}
                                                isDefaultValue={createSectionTitle}
                                            />
                                            <div className={styles.checkbox_section}>
                                                <p>Active</p>
                                                <Checkbox checked={createSectionActive}
                                                          onChange={() => setCreateSectionActive(!createSectionActive)}
                                                />
                                            </div>
                                            <div className={styles.checkbox_section}>
                                                <p>The student should pass all parts</p>
                                                <Checkbox checked={createSectionAllPass}
                                                          onChange={() => setCreateSectionAllPass(!createSectionAllPass)}
                                                />
                                            </div>
                                            <div className={styles.buttonsSection}>
                                                <button
                                                    className={`button_dark ${styles.button_close_content}`}
                                                    onClick={() => handleClickNewSection()}>Submit
                                                </button>

                                                <button
                                                    className={`button_close ${styles.button_close_content}`}
                                                    onClick={handleCLickCloseSection}>Close
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </>
                    )
                }
            </div>
            <DragDropContext onDragEndSection={onDragEndSection}>
                <Droppable droppableId="ROOT" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {section.map((sectionFile, index) => (
                                <Draggable key={sectionFile.id} draggableId={sectionFile.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} ref={provided.innerRef}>
                                            <div className={styles.container_pricing_background}>
                                                <div className={styles.accordion_title}>
                                                    <div className={styles.section_accordion_title_left}>
                                                        <span><FiGrid/></span>
                                                        <p>{sectionFile.title.length === 0 ? "Add new File" : sectionFile.title}</p>
                                                    </div>
                                                    <div className={styles.accordion_title_right}>
                                                <span {...provided.dragHandleProps}>
                                                        <i className="fa-solid fa-up-down-left-right"></i>
                                                </span>
                                                        <span className={styles.addSource}
                                                              onClick={() => handleClickNewSource(sectionFile.id)}
                                                        >
                                                              <LuPlus/>
                                                        </span>
                                                        <span className={styles.editSection}
                                                            onClick={() => handleClickEditSection(sectionFile.id)}>
                                                            <CiEdit/>
                                                        </span>
                                                        <div className={panelCss.comment_button}>
                                                            <OutsideClickHandler
                                                                onOutsideClick={() => setSectionInfoButtons({})}>
                                                                <HiDotsVertical
                                                                    onClick={() => handleCommentButtonClick(sectionFile.id)}/>
                                                                <div
                                                                    className={`${panelCss.button_edit} ${sectionInfoButtons[sectionFile.id] ? panelCss.button_active : ''}`}
                                                                >
                                                                    <span
                                                                        onClick={() => handleClickSectionDelete(sectionFile.id)}>Delete</span>
                                                                </div>
                                                            </OutsideClickHandler>
                                                        </div>
                                                        <i
                                                            className={`fa-solid fa-angle-down ${sectionFile.isContentVisible ? 'rotate-180' : ''}`}
                                                            onClick={() => toggleSectionContent(index)}
                                                        ></i>
                                                    </div>
                                                </div>
                                                {sectionFile.isContentVisible && (
                                                    <div className={styles.section_accordion_content}>
                                                        <div className="w-full">
                                                            <CourseSource
                                                                CourseSectionFile={Array.isArray(sectionFile.courseSource) ? sectionFile.courseSource : []}
                                                                setCourseSectionFile={(newCourseSource) => updateCourseSource(index, newCourseSource)}
                                                                sectionId={sectionFile.id}
                                                                toggleContent={(sourceIndex) => toggleContentSource(index, sourceIndex)}

                                                            />
                                                        </div>
                                                    </div>
                                                )}
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
    </>

};

export default CourseCard;
