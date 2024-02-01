import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./myComments.module.css"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {LuCalendar} from "react-icons/lu";
import {HiDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {useRouter} from "next/router";
import {fetchPanelCommentsCourse} from "@/lib/fetch";
import moment from "moment/moment";
import {useMediaQuery} from "react-responsive";
import PanelInput from "@/components/ui/Panel/Input";
import PanelDatePicker from "@/components/ui/Panel/PanelDatePicker";

const MyComments = () => {
    const router = useRouter();
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [courseSearch, setCourseSearch] = useState("");
    const [commentEditButtons, setCommentEditButtons] = useState({});
    const [commentEditPanel, setCommentEditPanel] = useState(true);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getComments = async () => {
            const response = await fetchPanelCommentsCourse();
            setComments(response);
        }
        getComments();
    }, []);
    const handleCourseSearch = (e) => {
        console.log(moment(startDate).format("YYYY MM DD"));
        console.log(moment(endDate).format("YYYY MM DD"));
        console.log(courseSearch);
    }
    const handleClickCourseName = (url) => {
        router.push(`/course/${url}`);
    }
    const handleClickEdit = (commentId) => {
        console.log(commentId);
    };
    const handleClickDelete = (commentId) => {
        console.log(commentId);
    };
    const handleCommentButtonClick = (commentId) => {
        setCommentEditButtons((prevButtons) => ({
            ...prevButtons,
            [commentId]: !prevButtons[commentId],
        }));
    };
    return <>
        <section className={styles.myComments_Section}>
            <h1 className={panelCss.title}>Filter comments</h1>
            <div className={styles.specific_date_container}>
                <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>
                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Course</p>
                    <PanelInput setInput={setCourseSearch}/>
                </div>
                <div className={panelCss.specific_date_show}>
                    <div className="button_dark" onClick={() => handleCourseSearch()}>Show Results</div>
                </div>
            </div>
            <h1 className={panelCss.title}>My comments</h1>
            {!isTabletOrMobile && <div className={styles.myComments}>
                <div className={styles.comments_head}>
                    <p>Course</p>
                    <p>Comment</p>
                    <p>Status</p>
                    <p>Date</p>
                    <p></p>
                </div>
                {
                    comments.map((item, index) => (
                        <div className={styles.comment_item} key={index}>
                            <div className={styles.comment_title}
                                 onClick={() => handleClickCourseName(item.courseUrl)}>{item.title}</div>
                            <div className={styles.comment_view}>View</div>
                            <div className={panelCss.status_success}>{item.status}</div>
                            <div className={styles.date}><span>{item.date.day}</span> | <span>{item.date.time}</span>
                            </div>
                            <div className={panelCss.comment_button}>
                                <HiDotsVertical
                                    onClick={() => handleCommentButtonClick(item.id)}
                                />
                                <OutsideClickHandler
                                    onOutsideClick={() => setCommentEditButtons({})}
                                >
                                    <div
                                        className={`${panelCss.button_edit} ${commentEditButtons[item.id] ? panelCss.button_active : ''}`}
                                    >
                                        <span onClick={() => handleClickEdit(item.id)}>Edit</span>
                                        <span onClick={() => handleClickDelete(item.id)}>Delete</span>
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </div>
                    ))
                }
            </div>}
            {isTabletOrMobile &&
                <div>
                    {
                        comments.map((item, index) => (
                            <div className={styles.myComments_mobile} key={index}>
                                <div className={styles.mobile_titles}>
                                    <p>Course</p>
                                    <p>Comment</p>
                                    <p>Status</p>
                                    <p>Date</p>
                                    <p>Action</p>
                                </div>
                                <div className={styles.mobile_content}>
                                    <p onClick={() => handleClickCourseName(item.courseUrl)}>{item.title}</p>
                                    <p className={styles.comment_view}>View</p>
                                    <p className={panelCss.status_success}>{item.status}</p>
                                    <p><span className="mr-2">{item.date.day}</span> | <span
                                        className="ml-2">{item.date.time}</span></p>
                                    <p><span className={styles.edit}
                                             onClick={() => handleClickEdit(item.id)}>Edit</span>
                                        <span className={styles.delete}
                                              onClick={() => handleClickDelete(item.id)}>Delete</span></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </section>
    </>
};

export default MyComments;
