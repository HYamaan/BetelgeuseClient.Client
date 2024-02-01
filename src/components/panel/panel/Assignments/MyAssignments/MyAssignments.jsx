import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./myAssignments.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuCalendar} from "react-icons/lu";
import DatePicker from "react-datepicker";
import {useMediaQuery} from "react-responsive";
import {HiDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {fetchPanelAssignments} from "@/lib/fetch";
import PanelDatePicker from "@/components/ui/Panel/PanelDatePicker";
import PanelSelect from "@/components/ui/Panel/Select";

const MyAssignments = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [courseOption, setCourseOption] = useState('');
    const [statusOption, setStatusOption] = useState('');
    const [assignmentEditButtons, setAssignmentEditButtons] = useState({});
    const [assignmentValues, setAssignmentValues] = useState([]);

    const status = [
        {"value": "all", "text": "All"},
        {"value": "pending", "text": "Pending"},
        {"value": "passed", "text": "Passed"},
        {"value": "notPassed", "text": "Not passed"},
        {"value": "notSubmitted", "text": "Not submitted"}
    ]
    const course = [
        {"value": "", "text": "Select an option"},
        {"value": "option1", "text": "Option 1"},
        {"value": "option2", "text": "Option 2"},
        {"value": "option3", "text": "Option 3"}
    ]


    const handleSelectCourseChange = (event) => {
        setCourseOption(event.target.value);
    };
    const handleSelectStatusChange = (event) => {
        setStatusOption(event.target.value);
    };
    const handleAssignmentSearch = (e) => {
    };
    const handleClickViewAssignment = (itemId) => {
    };
    const handleAssignmentButtonClick = (itemId) => {
        setAssignmentEditButtons((prevButtons) => ({
            ...prevButtons,
            [itemId]: !prevButtons[itemId],
        }));
    };

    useEffect(() => {
        const getAssignments = async () => {
            const response = await fetchPanelAssignments();
            setAssignmentValues(response);
        }
        getAssignments();
    }, []);


    return (
        <div className={styles.assignments_Section}>
            <h1 className={panelCss.title}>Assignment Statistics</h1>
            <div className={panelCss.container}>
                <div className={styles.statistics_row}>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/course-assignments.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>2</p>
                            <p className={panelCss.status_summary_content_title}>Course Assignments</p>
                        </div>
                    </div>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/pending-review.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>0</p>
                            <p className={panelCss.status_summary_content_title}>Pending Review</p>
                        </div>
                    </div>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/passed.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>1</p>
                            <p className={panelCss.status_summary_content_title}>Passed</p>
                        </div>
                    </div>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={styles.statistics_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/failed.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>0</p>
                            <p className={panelCss.status_summary_content_title}>Failed</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={panelCss.title}>Filter Assignments</h1>
            <div className={panelCss.container}>
                <div className={styles.filter_row}>

                    <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                    <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>

                    <div className={panelCss.specific_date}>
                        <p className={panelCss.specific_date_title}>Course</p>
                        <PanelSelect value={courseOption} onChange={handleSelectCourseChange} Data={course}/>
                    </div>
                    <div className={panelCss.specific_date}>
                        <p className={panelCss.specific_date_title}>Status</p>
                        <PanelSelect value={statusOption} onChange={handleSelectStatusChange} Data={status}/>
                    </div>
                    <div className={panelCss.specific_date_show}>
                        <div className="button_dark" onClick={() => handleAssignmentSearch()}>Show Results</div>
                    </div>
                </div>
            </div>
            <h1 className={panelCss.title}>My Assignments</h1>
            {!isTabletOrMobile && (<div className={panelCss.container}>
                <div className={styles.myAssignment_row}>
                    <p>Title/Course</p>
                    <p>Deadline</p>
                    <p>First Submission</p>
                    <p>Last Submission</p>
                    <p>Attempts</p>
                    <p>Grade</p>
                    <p>Pass Grade</p>
                    <p>Status</p>
                    <p></p>
                </div>
                {
                    assignmentValues.map((item, index) => (
                        <div className={`${styles.myAssignment_row} ${styles.myAssignment_item}`} key={index}>
                            <div className={styles.item_title_course}>
                                <span className={styles.item_title}>{item.task.title}</span>
                                <span className={styles.item_subTitle}>{item.task.subtitle}</span>
                            </div>
                            <div>{item.deadline}</div>
                            <div>{item.firstSubmission}</div>
                            <div>{item.lastSubmission}</div>
                            <div>{item.attempts}</div>
                            <div>{item.grade}</div>
                            <div>{item.passGrade}</div>
                            <div className={panelCss[`status_${item.status.color}`]}>{item.status.text}</div>
                            <div className={panelCss.comment_button}>
                                <HiDotsVertical
                                    onClick={() => handleAssignmentButtonClick(index)}
                                />
                                <OutsideClickHandler
                                    onOutsideClick={() => setAssignmentEditButtons({})}
                                >
                                    <div
                                        className={`${panelCss.button_edit} ${styles.view_button_edit} ${assignmentEditButtons[index] ? panelCss.button_active : ''}`}
                                    >
                                        <span
                                            onClick={() => handleClickViewAssignment(item.guid)}>View Assignment</span>
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </div>
                    ))
                }
            </div>)}
            {isTabletOrMobile && (
                assignmentValues.map((item, index) => (
                    <div
                        className={`${panelCss.container} ${styles.myAssignment_mobile}`}

                        key={index}
                    >
                        <div className={styles.myAssignment_row}>
                            <p>Title/Course</p>
                            <p>Deadline</p>
                            <p>First Submission</p>
                            <p>Last Submission</p>
                            <p>Attempts</p>
                            <p>Grade</p>
                            <p>Pass Grade</p>
                            <p>Status</p>
                            <p></p>
                        </div>
                        <div className={`${styles.myAssignment_row}`}>
                            <div className={styles.item_title_course}>
                                <span className={styles.item_title}>{item.task.title}</span>
                                <span className={styles.item_subTitle}>{item.task.subtitle}</span>
                            </div>
                            <div>{item.deadline}</div>
                            <div>{item.firstSubmission}</div>
                            <div>{item.lastSubmission}</div>
                            <div>{item.attempts}</div>
                            <div>{item.grade}</div>
                            <div>{item.passGrade}</div>
                            <div className={panelCss[`status_${item.status.color}`]}>{item.status.text}</div>
                            <div onClick={() => handleClickViewAssignment(item.guid)}
                                 className={styles.view_button}>View Assignment
                            </div>
                        </div>
                    </div>
                )))
            }
        </div>
    );
};

export default MyAssignments;
