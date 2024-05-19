import React, {useEffect, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./reservations.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {LuCalendar} from "react-icons/lu";
import DatePicker from "react-datepicker";
import {HiDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {useMediaQuery} from "react-responsive";
import {fetchPanelMeetingsInstructor} from "@/lib/fetch";
import PanelSelect from "@/components/ui/Panel/Select";
import PanelDatePicker from "@/components/ui/Panel/Input/PanelDatePicker";

const Reservations = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dayOption, setDayOption] = useState('');
    const [statusOption, setStatusOption] = useState('');
    const [instructorOption, setInstructorOption] = useState('');
    const [reservationEditButtons, setReservationEditButtons] = useState({});
    const [reservationInstructor, setReservationInstructor] = useState([]);

    useEffect(() => {
        const reservationInstructor = async () => {
            const response = await fetchPanelMeetingsInstructor();
            setReservationInstructor(response);
        }
        reservationInstructor();
    }, []);
    const handleSelectDayChange = (event) => {
        setDayOption(event.target.value);
    };
    const handleSelectStatusChange = (event) => {
        setStatusOption(event.target.value);
    };
    const handleSelectInstructorChange = (event) => {
        setInstructorOption(event.target.value);
    };
    const handleReservationsSearch = () => {
    }
    const handleClickAddToCalendar = (itemId) => {
    }

    const handleClickContactInstructor = (index) => {
    }
    const handleClickFinishMeeting = (index) => {
    }
    const handleReservationButtonClick = (itemId) => {
        setReservationEditButtons((prevButtons) => ({
            ...prevButtons,
            [itemId]: !prevButtons[itemId],
        }));
    };

    const day = [
        {"value": "all", "text": "All Days"},
        {"value": "sunday", "text": "Sunday"},
        {"value": "monday", "text": "Monday"},
        {"value": "tuesday", "text": "Tuesday"},
        {"value": "wednesday", "text": "Wednesday"},
        {"value": "thursday", "text": "Thursday"},
        {"value": "friday", "text": "Friday"},
        {"value": "saturday", "text": "Saturday"}
    ]
    const instructor = [
        {"value": "all", "text": "All instructors"},
        {"value": "105", "text": "Robert Ransdell"},
    ]
    const status = [
        {"value": "all", "text": "All"},
        {"value": "1", "text": "Open"},
        {"value": "0", "text": "Finished"},
    ]

    return (
        <div className={styles.reservation_Section}>
            <h1 className={panelCss.title}>Assignment Statistics</h1>
            <div className={panelCss.container}>
                <div className={styles.reservations_row}>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/open-meetings.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>0</p>
                            <p className={panelCss.status_summary_content_title}>Open Meetings</p>
                        </div>
                    </div>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/total-meetings.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>1</p>
                            <p className={panelCss.status_summary_content_title}>Total Meetings</p>
                        </div>
                    </div>
                    <div className={panelCss.status_summary_row_item}>
                        <div className={panelCss.status_summary_content}>
                            <LazyLoadImage
                                src={"/assets/image/background/panel/active-hours.svg"}
                                alt="circle"
                            />
                            <p className={panelCss.status_summary_content_count}>1</p>
                            <p className={panelCss.status_summary_content_title}>Active Hours</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={panelCss.title}>Filter meetings</h1>
            <div className={panelCss.container}>
                <div className={styles.filter_row}>
                    <PanelDatePicker title="From" select={startDate} setSelect={setStartDate}/>
                    <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>
                    <div className={panelCss.specific_date}>
                        <p className={panelCss.specific_date_title}>Day</p>
                        <PanelSelect value={dayOption} onChange={handleSelectDayChange} Data={day}/>
                    </div>
                    <div className={panelCss.specific_date}>
                        <p className={panelCss.specific_date_title}>Instructor</p>
                        <PanelSelect value={instructorOption} onChange={handleSelectInstructorChange}
                                     Data={instructor}/>
                    </div>
                    <div className={panelCss.specific_date}>
                        <p className={panelCss.specific_date_title}>Status</p>
                        <PanelSelect value={statusOption} onChange={handleSelectStatusChange} Data={status}/>
                    </div>
                    <div className={panelCss.specific_date_show}>
                        <div className="button_dark" onClick={() => handleReservationsSearch()}>Show Results</div>
                    </div>
                </div>
            </div>
            <h1 className={panelCss.title}>Meetings list</h1>
            {!isTabletOrMobile && <div className={panelCss.container}>
                <div className={`${styles.instructor_row} ${styles.instructor_row_head}`}>
                    <div>Instructor</div>
                    <div>Meeting Type</div>
                    <div>Day</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Paid Amount</div>
                    <div>Students count</div>
                    <div>Status</div>
                </div>
                {
                    reservationInstructor.map((item, index) => (
                        <div className={`${styles.instructor_row} ${styles.instructor_row_item}`} key={index}>
                            <div className={panelCss.instructor_item}>
                                <LazyLoadImage
                                    src={item.instructor.imageSrc}
                                    alt={item.instructor.imageSrc.split("/").pop()}
                                    loading='lazy'
                                    effect="opacity"
                                />
                                <div>
                                    <p className={panelCss.instructor_item_title}>{item.instructor.title}</p>
                                    <p className={panelCss.instructor_item_email}>{item.instructor.email}</p>
                                </div>
                            </div>
                            <div>{item.meetingInfo.type}</div>
                            <div>{item.meetingInfo.day}</div>
                            <div>{item.meetingInfo.date}</div>
                            <div
                                className={styles.item_time}>{item.meetingInfo.startTime} - {item.meetingInfo.endTime}</div>
                            <div>{item.meetingInfo.currency}{item.meetingInfo.amount}</div>
                            <div>{item.meetingInfo.studentsCount}</div>
                            <div
                                className={panelCss[`status_${item.meetingInfo.status.color}`]}>{item.meetingInfo.status.text}</div>
                            <div className={panelCss.comment_button}>
                                <OutsideClickHandler
                                    onOutsideClick={() => setReservationEditButtons({})}
                                >
                                    <HiDotsVertical
                                        onClick={() => handleReservationButtonClick(index)}
                                    />
                                    <div
                                        className={`${panelCss.button_edit} ${styles.view_button_edit} ${reservationEditButtons[index] ? panelCss.button_active : ''}`}
                                    >
                                        <span onClick={() => handleClickAddToCalendar(item.guid)}>Add to Calendar</span>
                                        <span
                                            onClick={() => handleClickContactInstructor(item.guid)}>Contact instructor</span>
                                        <span onClick={() => handleClickFinishMeeting(item.guid)}>Finish meeting</span>
                                    </div>
                                </OutsideClickHandler>
                            </div>
                        </div>
                    ))
                }
            </div>}
            {isTabletOrMobile && (
                reservationInstructor.map((item, index) => (
                    <div className={`${styles.instructor_row} ${styles.instructor_row_item} ${panelCss.container}`}
                         key={index}>
                        <p>Instructor</p>
                        <div className={panelCss.instructor_item}>
                            <LazyLoadImage
                                src={item.instructor.imageSrc}
                                alt={item.instructor.imageSrc.split("/").pop()}
                            />
                            <div>
                                <p className={panelCss.instructor_item_title}>{item.instructor.title}</p>
                                <p className={panelCss.instructor_item_email}>{item.instructor.email}</p>
                            </div>
                        </div>
                        <p>Meeting Type</p>
                        <div>{item.meetingInfo.type}</div>
                        <p>Day</p>
                        <div>{item.meetingInfo.day}</div>
                        <p>Date</p>
                        <div>{item.meetingInfo.date}</div>
                        <p>Time</p>
                        <div
                            className={styles.item_time}>{item.meetingInfo.startTime} - {item.meetingInfo.endTime}</div>
                        <p>Paid Amount</p>
                        <div>{item.meetingInfo.currency}{item.meetingInfo.amount}</div>
                        <p>Students count</p>
                        <div>{item.meetingInfo.studentsCount}</div>
                        <p>Status</p>
                        <div
                            className={panelCss[`status_${item.meetingInfo.status.color}`]}>{item.meetingInfo.status.text}</div>
                        <div className={`${panelCss.comment_button} ${styles.reservations_button}`}>
                            <div className={styles.view_button} onClick={() => handleClickAddToCalendar(item.guid)}>Add
                                to Calendar
                            </div>
                            <div className={styles.view_button}
                                 onClick={() => handleClickContactInstructor(item.guid)}>Contact instructor
                            </div>
                            <div className={styles.view_button}
                                 onClick={() => handleClickFinishMeeting(item.guid)}>Finish meeting
                            </div>
                        </div>
                    </div>
                ))
            )

            }
        </div>
    );
};

export default Reservations;
