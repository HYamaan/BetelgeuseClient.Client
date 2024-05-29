import React, {useState} from 'react';
import styles from './CoursesSUpport.module.css';
import panelCss from "@/components/panel/panel/panel.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import PanelDatePicker from "@/components/ui/Panel/Input/PanelDatePicker";
import PanelSelect from "@/components/ui/Panel/Select";
import PanelTextArea from "@/components/ui/Panel/Input/PanelTextArea";
import MultipleFileUpload from "@/components/ui/Panel/MultipleFileUpload";

const CoursesSupport = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [instructorOption, setInstructorOption] = useState("");
    const [courseOption, setCourseOption] = useState("");
    const [statusOption, setStatusOption] = useState("");
    const [conversationText, setConversationText] = useState("");
    const [files, setFiles] = useState([]);
    const instructors = [
        {"value": "100", "text": "All"}
    ]
    const courses = [
        {"value": "all", "text": "All"},
        {"value": "1990", "text": "Become a Product Manager  (Purchased)"},
        {"value": "1991", "text": "Learn Linux in 5 Days  (Purchased)"},
        {"value": "1992", "text": "Excel from Beginner to Advanced  (Purchased)"},
        {"value": "1993", "text": "How to Manage Your Virtual Team  (Purchased)"},
        {"value": "2002", "text": "Learn and Understand AngularJS  (Purchased)"},
        {"value": "2003", "text": "Web Design for Beginners  (Purchased)"},
        {"value": "2004", "text": "Travel Management Course  (Purchased)"},
        {"value": "2005", "text": "New Learning Page  (Purchased)"},
        {"value": "2006", "text": "New In-App Live System  (Purchased)"},
        {"value": "2007", "text": "New Update Features  (Purchased)"}
    ];
    const status = [
        {"value": "100", "text": "Open"},
        {"value": "101", "text": "Closed"},
        {"value": "102", "text": "Replied"}
    ];


    const handleSelectInstructorChange = (e) => {
        setInstructorOption(e.target.value);
    }
    const handleSelectCoursesChange = (e) => {
        setCourseOption(e.target.value);
    }
    const handleSelectStatusChange = (e) => {
        setStatusOption(e.target.value);
    }
    const handlePurchasesSearch = () => {
    }
    const handleClickCloseRequest = () => {
    }

    function handleClickSendMessage(event) {

        const selectedFiles = event.target.files;
        const allowedExtensions = ['.png', '.jpeg', '.jpg'];

        const isValidFiles = Array.from(selectedFiles).every(file => {
            const fileName = file.name.toLowerCase();
            return allowedExtensions.some(ext => fileName.endsWith(ext));
        });

        if (!isValidFiles) {
            alert('Dosya uzantıları .png, .jpeg veya .jpg olmalıdır.');
            event.target.value = null;
        } else {
            setFiles([...selectedFiles]);
        }
    }

    const PersonsData = [
        {
            "id": "a7f504b1-9b46-4c53-a0b9-8324311e7f22",
            "instructorName": "Robert Ransdell",
            "instructorTitle": "Instructor",
            "instructorImageSrc": "/assets/image/instructor/instructor-1.jpg",
            "courseTitle": "Version of Linux",
            "courseDescription": "Learn Linux in 5 ...",
            "date": "12 Jul 2021",
            "duration": "00:10",
            "status": "Closed"
        },
        {
            "id": "3e9a61f8-5e06-4e14-a050-0d7f3b45cb3e",
            "instructorName": "John Doe",
            "instructorTitle": "Instructor",
            "instructorImageSrc": "/assets/image/instructor/instructor-2.jpg",
            "courseTitle": "Introduction to Python",
            "courseDescription": "Explore the basics of Python programming language.",
            "date": "15 Aug 2021",
            "duration": "01:30",
            "status": "Open"
        },
        {
            "id": "f4d6d38e-82a9-46e3-89f5-65df05bd8961",
            "instructorName": "Jane Smith",
            "instructorTitle": "Senior Instructor",
            "instructorImageSrc": "/assets/image/instructor/instructor-3.jpg",
            "courseTitle": "Web Development Fundamentals",
            "courseDescription": "Learn the fundamentals of web development.",
            "date": "20 Sep 2021",
            "duration": "02:00",
            "status": "Open"
        },
        {
            "id": "8c6d1a14-5f76-45c8-b23e-76a9d1d0becc",
            "instructorName": "Alice Johnson",
            "instructorTitle": "Lead Instructor",
            "instructorImageSrc": "/assets/image/instructor/instructor-4.jpg",
            "courseTitle": "Advanced Machine Learning",
            "courseDescription": "Explore advanced topics in machine learning.",
            "date": "25 Oct 2021",
            "duration": "02:30",
            "status": "Closed"
        }
    ];
    return <div className={styles.section}>
        <h1 className={panelCss.title}>Support summary</h1>
        <div className={panelCss.container}>
            <div className={styles.support_row}>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/total-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>3</p>
                        <p className={panelCss.status_summary_content_title}>Total Orders</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/pending-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>1</p>
                        <p className={panelCss.status_summary_content_title}>Pending Orders</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/canceled-orders.png"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>0</p>
                        <p className={panelCss.status_summary_content_title}>Canceled Orders</p>
                    </div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Filter messages</h1>
        <div className={panelCss.container}>
            <div className={styles.report_row}>
                <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Seller</p>
                    <PanelSelect value={instructorOption} onChange={handleSelectInstructorChange} Data={instructors}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Quiz</p>
                    <PanelSelect value={courseOption} onChange={handleSelectCoursesChange} Data={courses}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Status</p>
                    <PanelSelect value={statusOption} onChange={handleSelectStatusChange} Data={status}/>
                </div>
                <div className={panelCss.specific_date_show}>
                    <div className="button_dark mt-2" onClick={() => handlePurchasesSearch()}>Show Results</div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Messages History</h1>
        <div className={`${panelCss.container} ${styles.container}`}>
            <div className={styles.history_row}>
                <div className={styles.history_row_persons}>
                    <div className={`${styles.persons_row} ${styles.persons_row_head}`}>
                        <div>Contact</div>
                        <div>Title</div>
                        <div>Status</div>
                    </div>
                    {PersonsData.map((item, index) => {
                        const courseDescription = item.courseDescription.length > 16 ? item.courseDescription.slice(0, 16) + "..." : item.courseDescription;
                        const courseTitle = item.courseTitle.length > 28 ? item.courseTitle.slice(0, 28) + "..." : item.courseTitle;
                        const statusColor = item.status === "Open" ? "success" : item.status === "Closed" ? "danger" : "warning";
                        return <div className={styles.persons_row} key={index}
                                    onClick={() => console.log("clicked")}
                        >
                            <div className={panelCss.instructor_item}>
                                <LazyLoadImage
                                    src={item.instructorImageSrc}
                                    alt={item.instructorImageSrc.split("/").pop()}
                                    loading='lazy'
                                    effect="opacity"
                                />
                                <div className={styles.persons_detail}>
                                    <p className={panelCss.instructor_item_title}>{item.instructorName}</p>
                                    <p className={styles.contact_duty}>{item.instructorTitle}</p>
                                </div>
                            </div>
                            <div className={`${styles.persons_course_title}`}>
                                <div>{courseTitle}</div>
                                <div className={styles.contact_duty}>
                                    <span>{courseDescription} </span>
                                    <span>| {item.date} |</span>

                                    <span>{item.duration}</span></div>
                            </div>
                            <div
                                className={`${panelCss[`status_${statusColor}`]} ${styles.contact_status}`}>{item.status}</div>
                        </div>
                    })}
                </div>
                <div className={styles.history_row_chat}>
                    <div className={styles.history_row_chat_content}>
                        <div className={styles.chat_header}>
                            <div>
                                <div className={styles.chat_title}>design software</div>
                                <div
                                    className={styles.chat_subtitle}>Created: <span>10 Jul 2021 </span>|<span> 17:41</span>
                                </div>
                                <div className={styles.chat_subtitle}>Live class:<span> Web Design for Beginners</span>
                                </div>
                            </div>
                            <div>
                                <div className="button_dark mt-2" onClick={() => handleClickCloseRequest()}>Close
                                    request
                                </div>
                            </div>
                        </div>
                        <div className={styles.conversations_card}>
                            <div className={styles.chat_card}>
                                <div className={styles.chat_body_header}>
                                    <div className={panelCss.instructor_item}>
                                        <LazyLoadImage
                                            src={"/assets/image/instructor/instructor-1.jpg"}
                                            alt={("/assets/image/instructor/instructor-1.jpg").split("/").pop()}
                                            loading='lazy'
                                            effect="opacity"
                                        />
                                        <div className={styles.persons_detail}>
                                            <p className={panelCss.instructor_item_title}>Cameron Schofield</p>
                                            <p className={styles.contact_duty}>User</p>
                                        </div>
                                    </div>
                                    <div className={styles.chat_subtitle}><span>10 Jul 2021 </span>|<span> 17:41</span>
                                    </div>
                                </div>
                                <div className={styles.chat_body_content}>
                                    <p>Hi, I have a question about the course.</p>
                                </div>
                            </div>
                            <div className={styles.chat_card}>
                                <div className={styles.chat_body_header}>
                                    <div className={panelCss.instructor_item}>
                                        <LazyLoadImage
                                            src={"/assets/image/instructor/instructor-1.jpg"}
                                            alt={("/assets/image/instructor/instructor-1.jpg").split("/").pop()}
                                            loading='lazy'
                                            effect="opacity"
                                        />
                                        <div className={styles.persons_detail}>
                                            <p className={panelCss.instructor_item_title}>Cameron Schofield</p>
                                            <p className={styles.contact_duty}>User</p>
                                        </div>
                                    </div>
                                    <div className={styles.chat_subtitle}><span>10 Jul 2021 </span>|<span> 17:41</span>
                                    </div>
                                </div>
                                <div className={styles.chat_body_content}>
                                    <p>Hi, I have a question about the course.</p>
                                </div>
                            </div>
                            <div className={styles.chat_card}>
                                <div className={styles.chat_body_header}>
                                    <div className={panelCss.instructor_item}>
                                        <LazyLoadImage
                                            src={"/assets/image/instructor/instructor-1.jpg"}
                                            alt={("/assets/image/instructor/instructor-1.jpg").split("/").pop()}
                                            loading='lazy'
                                            effect="opacity"
                                        />
                                        <div className={styles.persons_detail}>
                                            <p className={panelCss.instructor_item_title}>Cameron Schofield</p>
                                            <p className={styles.contact_duty}>User</p>
                                        </div>
                                    </div>
                                    <div className={styles.chat_subtitle}><span>10 Jul 2021 </span>|<span> 17:41</span>
                                    </div>
                                </div>
                                <div className={styles.chat_body_content}>
                                    <p>Hi, I have a question about the course.</p>
                                </div>
                            </div>
                            <div className={styles.chat_card}>
                                <div className={styles.chat_body_header}>
                                    <div className={panelCss.instructor_item}>
                                        <LazyLoadImage
                                            src={"/assets/image/instructor/instructor-1.jpg"}
                                            alt={("/assets/image/instructor/instructor-1.jpg").split("/").pop()}
                                            loading='lazy'
                                            effect="opacity"
                                        />
                                        <div className={styles.persons_detail}>
                                            <p className={panelCss.instructor_item_title}>Cameron Schofield</p>
                                            <p className={styles.contact_duty}>User</p>
                                        </div>
                                    </div>
                                    <div className={styles.chat_subtitle}><span>10 Jul 2021 </span>|<span> 17:41</span>
                                    </div>
                                </div>
                                <div className={styles.chat_body_content}>
                                    <p>Hi, I have a question about the course.</p>
                                </div>
                            </div>
                            <div className={styles.chat_card}>
                                <div className={styles.chat_body_header}>
                                    <div className={panelCss.instructor_item}>
                                        <LazyLoadImage
                                            src={"/assets/image/instructor/instructor-1.jpg"}
                                            alt={("/assets/image/instructor/instructor-1.jpg").split("/").pop()}
                                            loading='lazy'
                                            effect="opacity"
                                        />
                                        <div className={styles.persons_detail}>
                                            <p className={panelCss.instructor_item_title}>Cameron Schofield</p>
                                            <p className={styles.contact_duty}>User</p>
                                        </div>
                                    </div>
                                    <div className={styles.chat_subtitle}><span>10 Jul 2021 </span>|<span> 17:41</span>
                                    </div>
                                </div>
                                <div className={styles.chat_body_content}>
                                    <p>Hi, I have a question about the course.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.conversations_box}>
                            <h1 className={styles.conversations_title}>Reply to the conversation</h1>
                            <p className={`${panelCss.specific_date_title} my-2`}>Message</p>
                            <textarea
                                className={panelCss.specific_input}
                                rows={4}
                                onChange={(e) => setConversationText(e.target.value)}
                            />
                            <div className="flex justify-start items-end">
                                <div>
                                    <MultipleFileUpload title="Attach a file" files={files} setFiles={setFiles}/>
                                </div>
                                <div className="w-40">
                                    <div className="button_dark" onClick={handleClickSendMessage}>Send Message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}


export default CoursesSupport;
