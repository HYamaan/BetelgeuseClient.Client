import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const PanelTextArea = (props) => {
    const {setInputValue} = props;
    return <textarea
        className={panelCss.specific_input}
        rows={10}
        onChange={(e) => setInputValue(e.target.value)}
    />
};

export default PanelTextArea;
