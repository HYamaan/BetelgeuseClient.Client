import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import axios from "axios";
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";
import PanelInput from "@/components/ui/Panel/Input/Input";
import {Checkbox} from "@mui/material";
import {useSelector} from "react-redux";
import PanelInputNumber from "@/components/ui/Panel/Input/PanelInputNumber";
import {toast} from "react-toastify";

import {CourseLevel} from "@/enum/CourseLevel";
import {Languages} from "@/enum/Languages";


const UploadExtraInformation = () => {
    const [cookies, setCookie] = useCookies();
    const courseInformation = useSelector((state) => state.courseInformation);


    const [isCourseForm, setIsCourseForm] = useState(false);
    const [isSupport, setIsSupport] = useState(false);
    const [isCertificate, setIsCertificate] = useState(false);
    const [isDownloadable, setIsDownloadable] = useState(false);
    //const [isPartnered, setIsPartnered] = useState(false);

    const [tags, setTags] = useState("");
    const [duration, setDuration] = useState(0);

    const [category, setCategory] = useState('');
    const [allCategories, setAllCategories] = useState([]);

    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState([]);


    useEffect(() => {
        const fetchCourseCategories = async () => {
            try {
                const response = await axios.get(`${process.env.LOCAL_URL}/api/course/getCourseCategories`);
                if (response.status === 200) {
                    setAllCategories(response.data.data);
                    const firstCategory = response.data.data[0].categories[0].categoryID;
                    setCategory(firstCategory)
                }
            } catch (error) {
                console.error('Error fetching course categories:', error);
            }
        };

        fetchCourseCategories();

    }, []);

    async function handleMultipleSubmit(event) {
        const extraInformation = {
            "courseId": courseInformation.courseId,
            "isCourseForm": isCourseForm,
            "isSupport": isSupport,
            "isCertificate": isCertificate,
            "isDownloadable": isDownloadable,
            "tag": JSON.parse(JSON.stringify(processTags(), null, 2)),
            "duration": duration,
            "category": category,
            "courseSubLanguages": selectedLanguages
        }
        await axios.post(`${process.env.API_SERVER}/Course/UploadExtraInformation`, extraInformation, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`,
            }
        }).then(response => {
            console.log('Success:', response);
            toast.success('Extra information uploaded successfully');
        }).catch(error => {
            console.error('Error:', error.response);
            toast.error('Error uploading extra information');
        });
    }


    const handleChangeLevel = (event) => {
        const value = event.target.value;
        if (selectedLevel !== value) {
            setSelectedLevel(value);
        } else {
            setSelectedLevel(null);
        }
    };
    const handleCheckboxChangeLanguage = (event) => {
        const languageId = Number(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedLanguages(prevLanguages => [...prevLanguages, {language: languageId}]);
        } else {
            setSelectedLanguages(prevLanguages => prevLanguages.filter(lang => lang.language !== languageId));
        }
    };
    const processTags = () => {
        if (!tags) return [];
        const tagsArray = tags.split(',').map(tag => tag.trim());

        return tagsArray.map(tag => ({tag}));
    };

    const handleTypeChange = (e, change) => {
        change === "language" && setLanguage(e.target.value)
        change === "classType" && setClassType(e.target.value)
        change === "isCourseForm" && setIsCourseForm(!isCourseForm)
        change === "isSupport" && setIsSupport(!isSupport)
        change === "isCertificate" && setIsCertificate(!isCertificate)
        change === "isDownloadable" && setIsDownloadable(!isDownloadable)
        change === "isPartnered" && setIsDownloadable(!isPartnered)


    }
    return <>

        <section className={styles.section}>
            <div className={panelCss.container}>
                <div className={styles.input_width}>

                    <p className={panelCss.specific_date_title}>Duration (Minutes)</p>
                    <PanelInputNumber setInput={setDuration} isDefaultValue={duration}/>

                    <div className={styles.checkbox_section}>
                        <p>Course Forum</p>
                        <Checkbox checked={isCourseForm} onChange={(e) => handleTypeChange(e, "isCourseForm")}/>
                    </div>
                    <div className={styles.checkbox_section_subtitle}>- By enabling this feature, students will be able
                        to create questions and communicate with other students.
                    </div>

                    <div className={styles.checkbox_section}>
                        <p>Support</p>
                        <Checkbox checked={isSupport} onChange={(e) => handleTypeChange(e, "isSupport")}/>
                    </div>

                    <div className={styles.checkbox_section}>
                        <p>Completion Certificate</p>
                        <Checkbox checked={isCertificate} onChange={(e) => handleTypeChange(e, "isCertificate")}/>
                    </div>
                    <div className={styles.checkbox_section_subtitle}>- A certificate will be awarded to the student
                        when passed the course.
                    </div>
                    <div className={styles.checkbox_section}>
                        <p>Support</p>
                        <Checkbox checked={isDownloadable} onChange={(e) => handleTypeChange(e, "isDownloadable")}/>
                    </div>
                    {/*<div className={styles.checkbox_section}>*/}
                    {/*    <p>Support</p>*/}
                    {/*    <Checkbox checked={isPartnered} onChange={(e) => handleTypeChange(e, "isPartnered")}/>*/}
                    {/*</div>*/}

                    <p className={panelCss.specific_date_title}>Tags</p>
                    <PanelInput setInput={setTags} isDefaultValue={tags}/>

                    <p className={panelCss.specific_date_title}>Category</p>
                    <select
                        className={panelCss.specific_input}
                        value={category}
                        onChange={(e) => handleTypeChange(e, "category")}
                    >
                        {allCategories.map((group, index) => (
                            <React.Fragment key={index}>
                                {group.parentCategoryID !== null &&
                                    <option disabled>{group.parentCategoryName}</option>}
                                {group.categories.map((categoryValue) => (
                                    <option key={categoryValue.categoryID} value={categoryValue.categoryID}
                                            defaultValue={category}>
                                        {categoryValue.name}
                                    </option>
                                ))}
                            </React.Fragment>
                        ))}
                    </select>
                    <p className={panelCss.specific_date_title}>Category Filter</p>
                    <div className={styles.category_filters}>
                        <div className={styles.category_filter}>
                            <div className={styles.category_filters_title}>Level</div>
                            {
                                Object.keys(CourseLevel).map(level => (
                                    <div className={styles.category_filters_item} key={level}>
                                        <label>{level}</label>
                                        <input
                                            type="checkbox"
                                            value={CourseLevel[level]}
                                            onChange={handleChangeLevel}
                                            checked={selectedLevel === CourseLevel[level].toString()}
                                            disabled={selectedLevel !== null && selectedLevel !== CourseLevel[level].toString()}
                                        />
                                    </div>
                                ))

                            }
                        </div>
                        <div className={styles.category_filter}>
                            <div className={styles.category_filters_title}>Language</div>
                            {
                                Object.keys(Languages).map(language => (
                                    <div className={styles.category_filters_item} key={language}>
                                        <label>{language}</label>
                                        <input
                                            type="checkbox"
                                            value={Languages[language]}
                                            onChange={handleCheckboxChangeLanguage}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>


            </div>
            <div className="w-40">
                <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
            </div>
        </section>
    </>
};

export default UploadExtraInformation;
