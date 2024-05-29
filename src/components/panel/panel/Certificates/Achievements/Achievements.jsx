import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./achievements.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuCalendar} from "react-icons/lu";
import DatePicker from "react-datepicker";
import {useMediaQuery} from "react-responsive";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import {fetchPanelAchievements} from "@/lib/fetch";
import PanelDatePicker from "@/components/ui/Panel/Input/PanelDatePicker";
import PanelSelect from "@/components/ui/Panel/Select";
import PanelInput from "@/components/ui/Panel/Input/Input";

const Achievements = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [courseOption, setCourseOption] = useState('');
    const [QuizzesOption, setQuizzesOption] = useState('');
    const [achievementsSearch, setAchievementsSearch] = useState('');
    const [achievementsEditButtons, setAchievementsEditButtons] = useState({});
    const [achievementsValues, setAchievementsValues] = useState([]);
    const course = [
        [
            {"value": "all", "text": "All courses"},
            {"value": "1995", "text": "Become a Product Manager"},
            {"value": "1996", "text": "Learn Linux in 5 Days"},
            {"value": "1998", "text": "Excel from Beginner to Advanced"},
            {"value": "1999", "text": "How to Manage Your Virtual Team"},
            {"value": "2001", "text": "Learn and Understand AngularJS"},
            {"value": "2005", "text": "Web Design for Beginners"},
            {"value": "2007", "text": "Travel Management Course"},
            {"value": "2008", "text": "New Learning Page"},
            {"value": "2009", "text": "New In-App Live System"},
            {"value": "2010", "text": "New Update Features"}
        ]

    ];
    const Quiz = [
        {"value": "all", "text": "All quizzes"},
        {"value": "28", "text": "Elementary Quiz", "className": "none"}
    ];

    useEffect(() => {
        const reservationInstructor = async () => {
            const response = await fetchPanelAchievements();
            setAchievementsValues(response);
        }
        reservationInstructor();
    }, []);

    const handleAchievementsSearch = () => {
    }
    const handleSelectCourseChange = (event) => {
        setCourseOption(event.target.value);
    };
    const handleSelectQuizzesChange = (event) => {
        setQuizzesOption(event.target.value);
    };
    const handleClickOpen = (itemID) => {
    };
    const handleReservationButtonClick = (itemId) => {
        setAchievementsEditButtons((prevButtons) => ({
            ...prevButtons,
            [itemId]: !prevButtons[itemId],
        }));
    };

    return <div className={styles.section}>
        <h1 className={panelCss.title}>My certificates statistics</h1>
        <div className={panelCss.container}>
            <div className={styles.certificates_statistics_row}>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/certificates.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>1</p>
                        <p className={panelCss.status_summary_content_title}>Certificates</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/average-grade.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>80</p>
                        <p className={panelCss.status_summary_content_title}>Average Grade</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/failed-quizzes.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>1</p>
                        <p className={panelCss.status_summary_content_title}>Failed Quizzes</p>
                    </div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Filter certificates</h1>
        <div className={panelCss.container}>
            <div className={styles.filter_certificates_row}>
                <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>

                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Course</p>
                    <PanelSelect value={courseOption} onChange={handleSelectCourseChange} Data={course}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Quiz</p>
                    <PanelSelect value={QuizzesOption} onChange={handleSelectQuizzesChange} Data={Quiz}/>
                </div>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Grade</p>
                    <PanelInput setInput={setAchievementsSearch}/>
                </div>
                <div className={panelCss.specific_date_show}>
                    <div className="button_dark mt-2" onClick={() => handleAchievementsSearch()}>Show Results</div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>My certificates</h1>
        {!isTabletOrMobile && (<div className={panelCss.container}>
            <div className={`${styles.certificates_row} ${styles.certificates_row_head}`}>
                <div>Certificate</div>
                <div>Certificate ID</div>
                <div>Minimum Grade</div>
                <div>Average Grade</div>
                <div>My grade</div>
                <div>Date</div>
                <div></div>
            </div>
            {achievementsValues.map((item, index) => (
                <div className={`${styles.certificates_row} ${styles.certificates_row_item}`} key={index}>
                    <div className={styles.item_quiz_titles}>
                        <p>{item.certificate.title}</p>
                        <p className={styles.item_quiz_subtitle}>{item.certificate.title}</p>
                    </div>
                    <div>{item.certificateID}</div>
                    <div>{item.minimumGrade}</div>
                    <div>{item.averageGrade}</div>
                    <div>{item.myGrade}</div>
                    <div>{item.date}</div>
                    <div className={panelCss.comment_button}>
                        <OutsideClickHandler
                            onOutsideClick={() => setAchievementsEditButtons({})}
                        >
                            <HiDotsVertical
                                onClick={() => handleReservationButtonClick(index)}
                            />
                            <div
                                className={`${panelCss.button_edit} ${styles.view_button_edit} ${achievementsEditButtons[index] ? panelCss.button_active : ''}`}
                            >
                                <span onClick={() => handleClickOpen(item.guid)}>Open</span>

                            </div>
                        </OutsideClickHandler>
                    </div>
                </div>
            ))}
        </div>)}
        {isTabletOrMobile && (
            achievementsValues.map((item, index) => (
                <div className={`${panelCss.container}  ${styles.achievements_row_item}`} key={index}>
                    <div className={styles.certificates_row_head}>Certificate :</div>
                    <div className={styles.item_quiz_titles}>
                        <p>{item.certificate.title}</p>
                        <p className={styles.item_quiz_subtitle}>{item.certificate.title}</p>
                    </div>
                    <div className={styles.certificates_row_head}>Certificate ID :</div>
                    <div>{item.certificateID}</div>
                    <div className={styles.certificates_row_head}>Minimum Grade :</div>
                    <div>{item.minimumGrade}</div>
                    <div className={styles.certificates_row_head}>Average Grade :</div>
                    <div>{item.averageGrade}</div>
                    <div className={styles.certificates_row_head}>My grade :</div>
                    <div>{item.myGrade}</div>
                    <div className={styles.certificates_row_head}>Date :</div>
                    <div>{item.date}</div>
                    <div className={`${panelCss.comment_button} ${styles.achievements_button}`}>
                        <div className={styles.view_button} onClick={() => handleClickOpen(item.guid)}>Open
                        </div>
                    </div>
                </div>)))
        }
    </div>
};

export default Achievements;
