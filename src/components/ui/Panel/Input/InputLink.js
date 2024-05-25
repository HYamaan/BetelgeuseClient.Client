import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import {LuLink} from "react-icons/lu";

const PanelInput = (props) => {
    const {title, setInput} = props;

    if (props.isDefaultValue) {
        return <div className={panelCss.specific_date}>
            <p className={panelCss.specific_date_title}>{title}</p>
            <div className={panelCss.calender}>
                    <span className={panelCss.calender_style}>
                       <LuLink/>
                    </span>
                <input type="text"
                       className={panelCss.specific_input}
                       onChange={(e) => setInput(e.target.value)}
                       defaultValue={props.isDefaultValue}
                />
            </div>
        </div>

    } else {
        return <div className={panelCss.specific_date}>
            <p className={panelCss.specific_date_title}>{title}</p>
            <div className={panelCss.calender}>
                    <span className={panelCss.calender_style}>
                       <LuLink/>
                    </span>
                <input type="text"
                       className={panelCss.specific_input}
                       onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </div>
    }

};

export default PanelInput;
