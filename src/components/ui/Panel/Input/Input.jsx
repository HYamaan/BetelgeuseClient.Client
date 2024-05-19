import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const PanelInput = (props) => {
    const {setInput} = props;

    if (props.isDefaultValue) {
        return <input type="text"
                      className={panelCss.specific_input}
                      onChange={(e) => setInput(e.target.value)}
                      defaultValue={props.isDefaultValue}
        />
    } else {
        return <input type="text"
                      className={panelCss.specific_input}
                      onChange={(e) => setInput(e.target.value)}
        />
    }

};

export default PanelInput;
