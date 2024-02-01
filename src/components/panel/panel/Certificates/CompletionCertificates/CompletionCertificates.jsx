import React, {useEffect, useState} from 'react';
import styles from "./completionCertificates.module.css";
import panelCss from "@/components/panel/panel/panel.module.css";
import {LuCalendar} from "react-icons/lu";
import DatePicker from "react-datepicker";
import {useMediaQuery} from "react-responsive";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {HiDotsVertical} from "react-icons/hi";
import {fetchPanelCompletionCertificates} from "@/lib/fetch";
import PanelDatePicker from "@/components/ui/Panel/PanelDatePicker";
import PanelSelect from "@/components/ui/Panel/Select";

const CompletionCertificates = () => {
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [courseOption, setCourseOption] = useState('');
    const [certificatesEditButtons, setCertificatesEditButtons] = useState({});
    const [certificatesValues, setCertificatesValues] = useState([]);
    const course = [
        {"value": "all", "text": "All courses"},
        {"value": "1999", "text": "How to Manage Your Virtual Team"},
        {"value": "2001", "text": "Learn and Understand AngularJS"},
        {"value": "2002", "text": "Health And Fitness Masterclass"},
        {"value": "2006", "text": "How to Travel Around the World"},
        {"value": "2007", "text": "Travel Management Course"},
        {"value": "2008", "text": "New Learning Page"},
        {"value": "2010", "text": "New Update Features"}
    ];

    useEffect(() => {
        const reservationInstructor = async () => {
            const response = await fetchPanelCompletionCertificates();
            setCertificatesValues(response);
        }
        reservationInstructor();
    }, []);
    const handleSelectCourseChange = (e) => {
    }
    const handleCertificateSearch = () => {
    }
    const handleClickOpen = (guid) => {
    }
    const handleReservationButtonClick = (itemId) => {
        setCertificatesEditButtons((prevButtons) => ({
            ...prevButtons,
            [itemId]: !prevButtons[itemId],
        }));
    };

    return <div className={styles.section}>
        <h1 className={panelCss.title}>Filter certificates</h1>
        <div className={panelCss.container}>
            <div className={styles.certificates_row}>
                <PanelDatePicker title="To" select={startDate} setSelect={setStartDate}/>
                <PanelDatePicker title="To" select={endDate} setSelect={setEndDate}/>

                <div className={panelCss.specific_date}>
                    <p className={panelCss.specific_date_title}>Course</p>
                    <PanelSelect value={courseOption} onChange={handleSelectCourseChange} Data={course}/>
                </div>
                <div className={panelCss.specific_date_show}>
                    <div className="button_dark mt-2" onClick={() => handleCertificateSearch()}>Show Results</div>
                </div>
            </div>
        </div>
        <h1 className={panelCss.title}>Filter certificates</h1>
        {!isTabletOrMobile && (<div className={panelCss.container}>
            <div className={`${styles.certificates_row_items} ${styles.certificates_row_head}`}>
                <div>Course</div>
                <div>Certificate ID</div>
                <div>Date</div>
                <div></div>
            </div>
            {certificatesValues.map((item, index) => (
                <div className={`${styles.certificates_row_items} ${styles.certificates_row_item}`} key={index}>
                    <div>{item.course}</div>
                    <div>{item.certificateID}</div>
                    <div>{item.date}</div>
                    <div className={panelCss.comment_button}>
                        <OutsideClickHandler
                            onOutsideClick={() => setCertificatesEditButtons({})}
                        >
                            <HiDotsVertical
                                onClick={() => handleReservationButtonClick(index)}
                            />
                            <div
                                className={`${panelCss.button_edit} ${styles.view_button_edit} ${certificatesEditButtons[index] ? panelCss.button_active : ''}`}
                            >
                                <span onClick={() => handleClickOpen(item.guid)}>Open</span>

                            </div>
                        </OutsideClickHandler>
                    </div>
                </div>
            ))}
        </div>)}
    </div>

};

export default CompletionCertificates;
