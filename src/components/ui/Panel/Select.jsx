import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const PanelSelect = (props) => {
    const {Data, value, onChange, disabled} = props;

    return (
        <select
            className={panelCss.specific_input}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            {Data.map((item, index) => (
                <option
                    key={index}
                    value={item.value}
                    disabled={disabled && index === 0}
                >
                    {item.text}
                </option>
            ))}
        </select>
    );
};

export default PanelSelect;
