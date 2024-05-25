import React, {useEffect, useState} from 'react';
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";
import PanelInput from "@/components/ui/Panel/Input/Input";
import OneFileUpload from "@/components/ui/Panel/OneFileUpload";
import WYSIWYG from "@/components/ui/WYSIWYG/WYSIWYG";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {setCourseId} from "@/redux/features/CourseInformation/courseInformation";

const New = () => {
    const [cookies, setCookie] = useCookies();
    const dispatch = useDispatch()
    const [language, setLanguage] = useState(1);
    const [classType, setClassType] = useState(1);
    const [title, setTitle] = useState("");
    const [seoTitle, setSeoTitle] = useState("");

    const [thumbnail, setThumbnail] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        console.log("cover", coverImage);
    }, [coverImage]);

    async function handleMultipleSubmit(event) {
        event.preventDefault(); // Formun varsayılan gönderimini engelle

        const formData = new FormData();
        formData.append('Language', language);
        formData.append('CourseType', classType);
        formData.append('Title', title);
        formData.append('SeoDescription', seoTitle);
        formData.append('Description', description);

        if (thumbnail.size > 0) {
            formData.append('Thumbnail', thumbnail)
        }

        if (coverImage.size > 0) {
            formData.append('CoverImage', coverImage)
        }

        await axios.post(`${process.env.API_SERVER}/Course/UploadBasicInformation`, formData, {
            headers: {
                'Authorization': `Bearer ${cookies.accessToken}`,
            }
        }).then(response => {
            console.log('Success:', response.data);
            toast.success("Course created successfully")
            dispatch(setCourseId(response.data.data))

        }).catch(error => {
            console.error('Error:', error.response.data);
            toast.error("An error occurred while creating the course")
        });
    }


    const handleTypeChange = (e, change) => {
        change === "language" && setLanguage(e.target.value)
        change === "classType" && setClassType(e.target.value)
    }
    return <>
        <section className={styles.section}>
            <div className={panelCss.container}>
                <div className={styles.input_width}>
                    <p className={panelCss.specific_date_title}>Language</p>
                    <select
                        className={panelCss.specific_input}
                        value={language}
                        onChange={(e) => handleTypeChange(e, "language")}
                    >
                        <option value={1}>Turkish</option>
                        <option value={2}>English</option>
                    </select>

                    <p className={panelCss.specific_date_title}>Course type</p>
                    <select
                        className={panelCss.specific_input}
                        value={classType}
                        onChange={(e) => handleTypeChange(e, "classType")}
                    >
                        <option value={1}>VideoCourse</option>
                        <option value={2}>LiveClass</option>
                        <option value={2}>TextCourse</option>
                    </select>

                    <p className={panelCss.specific_date_title}>Title</p>
                    <PanelInput setInput={setTitle} isDefaultValue={title}/>

                    <p className={panelCss.specific_date_title}>SEO Meta Description</p>
                    <PanelInput setInput={setSeoTitle} isDefaultValue={seoTitle}/>

                    <p className={`${panelCss.specific_date_title} ${styles.marginBottom}`}>Thumbnail</p>
                    <OneFileUpload file={thumbnail} setFile={setThumbnail} className={styles.uploadImage}
                    />
                    <p className={`${panelCss.specific_date_title} ${styles.marginBottom}`}>Cover Image</p>
                    <OneFileUpload file={coverImage} setFile={setCoverImage} className={styles.uploadImage}
                    />
                </div>
                <p className={`${panelCss.specific_date_title} ${styles.marginTop}`}>Description</p>
                <WYSIWYG className={styles.wysiwyg} text={description} setText={setDescription}/>

            </div>
            <div className="w-40">
                <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
            </div>
        </section>
    </>
};

export default New;
