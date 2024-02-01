import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const AccountInput = (props) => {
    const {title, placeholder, errorMessage, icon, touched, ...inputs} = props
    return <div className="mb-2">
        <h2 className={panelCss.specific_date_title}>{title}</h2>
        <input  {...inputs}
                type={inputs.type}
                className={panelCss.specific_input}
        />
    </div>
};

export default AccountInput;
