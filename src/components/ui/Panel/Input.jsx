import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const PanelInput = (props) => {
    const {setInput} = props;
    return <input type="text"
                  className={panelCss.specific_input}
                  onChange={(e) => setInput(e.target.value)}/>

};

export default PanelInput;
