import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "../MyArticles/MyArticles.module.css"
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import {fetchPanelAchievements} from "@/lib/fetch";
import {useMediaQuery} from "react-responsive";
import {useCookies} from 'react-cookie';
import axios from "axios";

const MyArticles = ({slug}) => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [achievementsEditButtons, setAchievementsEditButtons] = useState({});
    const [achievementsValues, setAchievementsValues] = useState([]);
    const [cookies, setCookie] = useCookies();
    const [panelBlogs, setPanelBlogs] = useState([]);
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

    useEffect(() => {
        const getPanelBlogsId = async () => {
            const getBlogs = await axios.get(`${process.env.API_SERVER}/Blog/GetPanelBlogById`, {
                headers: {
                    "Authorization": `Bearer ${cookies.accessToken}`
                }
            })
            if (getBlogs.data.succeeded) {
                setPanelBlogs(getBlogs.data.data)
            }
            console.log(panelBlogs)
        }
        getPanelBlogsId();
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
    const handleClickDelete = async (itemID) => {
        const getBlogs = await axios.delete(`${process.env.API_SERVER}/Blog/DeleteBlog?Id=${itemID}`, {
            headers: {
                "Authorization": `Bearer ${cookies.accessToken}`
            }
        })
        if (getBlogs.data.succeeded) {
            setPanelBlogs(() => panelBlogs.filter((item) => item.id !== itemID))
        }

    }
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

        <h1 className={panelCss.title}>My certificates</h1>
        {!isTabletOrMobile && (<div className={panelCss.container}>
            <div className={`${styles.certificates_row} ${styles.certificates_row_head}`}>
                <div>Title</div>
                <div>Category ID</div>
                <div>Comments</div>
                <div>Views</div>
                <div>Status</div>
                <div>Date Created</div>
                <div></div>
            </div>
            {panelBlogs.map((item, index) => (
                <div className={`${styles.certificates_row} ${styles.certificates_row_item}`} key={item.id}>
                    <div className={styles.item_quiz_titles}>
                        <p>{item.title}</p>
                    </div>
                    <div>{item.category}</div>
                    <div>{item.comments}</div>
                    <div>{item.views}</div>
                    <div>{item.status}</div>
                    <div>{item.createdAt}</div>
                    <div className={panelCss.comment_button}>
                        <OutsideClickHandler
                            onOutsideClick={() => setAchievementsEditButtons({})}
                        >
                            <HiDotsVertical
                                onClick={() => handleReservationButtonClick(item.id)}
                            />
                            <div
                                className={`${panelCss.button_edit} ${styles.view_button_edit} ${achievementsEditButtons[item.id] ? panelCss.button_active : ''}`}
                            >
                                <span onClick={() => handleClickOpen(item.id)}>Edit</span>
                                <span onClick={() => handleClickDelete(item.id)}>Delete</span>

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

export default MyArticles;
