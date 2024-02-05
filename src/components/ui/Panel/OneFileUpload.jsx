import React, {useRef} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import {BiCloudUpload} from "react-icons/bi";

const OneFileUpload = (props) => {
    const {title, file, setFile} = props;
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    function handleMultipleChange(event) {
        const selectedFile = event.target.files[0];
        const allowedExtensions = ['.png', '.jpeg', '.jpg'];
        const fileName = selectedFile.name.toLowerCase();
        const isValidFiles = allowedExtensions.some(ext => fileName.endsWith(ext));
        console.log("selectedFile", selectedFile)
        if (!isValidFiles) {
            alert('Dosya uzantıları .png, .jpeg veya .jpg olmalıdır.');
            event.target.value = null;
        } else {
            setFile(selectedFile);
        }
    }

    return <div className={`${panelCss.specific_date} ${panelCss.FilePickerOptionelWidth}`}>
        <p className={panelCss.specific_date_title}>{title}</p>
        <div className={panelCss.calender}>
                    <span className={panelCss.calender_style} onClick={handleClick}>
                   <BiCloudUpload/>
                    </span>

            <div className={`${panelCss.date_picker} ${panelCss.file_picker} ${panelCss.FilePickerOptionelWidth}`}>
                <div className={panelCss.file_list}>
                    {file.name}
                </div>
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

export default OneFileUpload;
