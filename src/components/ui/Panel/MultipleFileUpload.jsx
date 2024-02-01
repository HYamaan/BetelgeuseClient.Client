import React, {useRef, useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";

import {BiCloudUpload} from "react-icons/bi";

const MultipleFileUpload = (props) => {
    const {title, files, setFiles} = props;
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    function handleMultipleChange(event) {
        const selectedFiles = event.target.files;
        const allowedExtensions = ['.png', '.jpeg', '.jpg'];

        const isValidFiles = Array.from(selectedFiles).every(file => {
            const fileName = file.name.toLowerCase();
            return allowedExtensions.some(ext => fileName.endsWith(ext));
        });

        if (!isValidFiles) {
            alert('Dosya uzantıları .png, .jpeg veya .jpg olmalıdır.');
            event.target.value = null;
        } else {
            setFiles([...selectedFiles]);
        }
    }

    return <div className={panelCss.specific_date}>
        <p className={panelCss.specific_date_title}>{title}</p>
        <div className={panelCss.calender}>
                    <span className={panelCss.calender_style} onClick={handleClick}>
                   <BiCloudUpload/>
                    </span>

            <div className={`${panelCss.date_picker} ${panelCss.file_picker}`}>
                {files.length > 0 && (
                    <div className={panelCss.file_list}>
                        {files.map((file, index) => (
                            <span key={index}>{file.name}{(files.length > index && index > 0) && ", "}</span>
                        ))}
                    </div>
                )}
            </div>
            <input type="file"
                   ref={hiddenFileInput}
                   multiple
                   onChange={handleMultipleChange}
                   accept="image/*"
                   className="hidden"
            />
            <div>
            </div>
        </div>
    </div>
};

export default MultipleFileUpload;
