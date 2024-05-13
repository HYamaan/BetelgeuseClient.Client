import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

const PanelInputNumber = (props) => {
    const {setInput} = props;

    if (props.isDefaultValue) {
        return <input type="number"
                      className={panelCss.specific_input}
                      onChange={(e) => setInput(e.target.value)}
                      defaultValue={props.isDefaultValue}
        />
    } else {
        return <input type="number"
                      className={panelCss.specific_input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={props.isDisabled}
        />
    }
};

export default PanelInputNumber;
