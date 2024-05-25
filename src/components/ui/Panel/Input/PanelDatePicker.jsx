import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import {LuCalendar} from "react-icons/lu";
import DatePicker from "react-datepicker";

const PanelDatePicker = (props) => {
    const {title, select, setSelect} = props;
    return <div className={panelCss.specific_date}>
        <p className={panelCss.specific_date_title}>{title}</p>
        <div className={panelCss.calender}>
                    <span className={panelCss.calender_style}>
                       <LuCalendar/>
                    </span>
            <DatePicker
                selected={select}
                onChange={date => setSelect(date)}
                className={panelCss.date_picker}
            />
        </div>
    </div>
};

export default PanelDatePicker;
