import React, {useState, useEffect, useRef} from 'react';
import styles from "./NewSupport.module.css"
import panelCss from "@/components/panel/panel/panel.module.css";

import PanelInput from "@/components/ui/Panel/Input";
import PanelSelect from "@/components/ui/Panel/Select";
import PanelTextArea from "@/components/ui/Panel/PanelTextArea";
import MultipleFileUpload from "@/components/ui/Panel/MultipleFileUpload";
import axios from "axios";

const TypeData = [
    {value: "", text: ""},
    {value: "course_support", text: "Course Support"},
    {value: "platform_support", text: "Platform Support"},
]
const CourseData = [
    {"value": "100", "text": "Become a Product Manager - Ricardo Dave"},
    {"value": "101", "text": "Learn Linux in 5 Days - Robert Ransdell"},
    {"value": "102", "text": "Excel from Beginner to Advanced - Robert Ransdell"},
    {"value": "103", "text": "Learn and Understand AngularJS - James Kong"},
    {"value": "104", "text": "Web Design for Beginners - King Pictures"},
    {"value": "105", "text": "Travel Management Course - Light Moon"},
    {"value": "106", "text": "New Learning Page - Robert Ransdell"},
    {"value": "107", "text": "New In-App Live System - Robert Ransdell"},
    {"value": "108", "text": "New Update Features - Kate Williams"}
]
const PlatformData = [
    {value: "100", text: "Financial"},
    {value: "101", text: "Content"},
    {value: "102", text: "Marketing"},
]
const NewSupport = () => {
    const [subject, setSubject] = useState("");
    const [type, setType] = useState('');
    const [course, setCourse] = useState('');
    const [platformSupport, setPlatformSupport] = useState('');
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState([]);

    function handleMultipleSubmit(event) {
        event.preventDefault();
        const url = 'http://localhost:3000/uploadFiles';
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });
        formData.append('subject', subject);
        formData.append('type', type);
        formData.append('course', course);
        formData.append('platformSupport', platformSupport);
        formData.append('message', message);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        //TODO: axios post
        // axios({
        //     method: "POST",
        //     url: "myurl",
        //     data: formData,
        //    config
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }
    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    }
    const handlePlatformSupportChange = (event) => {
        setPlatformSupport(event.target.value);
    }
    return <section className={styles.section}>
        <h1 className={panelCss.title}>New support message</h1>
        <div className={panelCss.container}>
            <p className={panelCss.specific_date_title}>Subject</p>
            <PanelInput setInput={setSubject}/>
            <p className={panelCss.specific_date_title}>Type</p>
            <PanelSelect value={type} onChange={handleTypeChange} Data={TypeData} disabled={true}/>
            {
                TypeData.map((item, index) => (
                    type === item.value && item.value.length > 0 && (
                        <div key={index}>
                            <p className={panelCss.specific_date_title}>{item.text}</p>
                            <PanelSelect
                                value={item.value === "course_support" ? course : platformSupport}
                                onChange={item.value === "course_support" ? handleCourseChange : handlePlatformSupportChange}
                                Data={item.value === "course_support" ? CourseData : PlatformData}
                            />
                        </div>
                    )
                ))
            }
            <p className={panelCss.specific_date_title}>Message</p>
            <PanelTextArea setInputValue={setMessage}/>
            <div className="flex justify-start items-end">
                <div>
                    <MultipleFileUpload title="Attach a file" files={files} setFiles={setFiles}/>
                </div>
                <div className="w-40">
                    <div className="button_dark" onClick={handleMultipleSubmit}>Send Message</div>
                </div>
            </div>

        </div>

    </section>
};

export default NewSupport;
