import React, {useState} from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import styles from "./Education.module.css";
import {HiDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {useMediaQuery} from "react-responsive";

const Education = () => {
    const [commentEditButtons, setCommentEditButtons] = useState({});
    const [openAddEducation, setOpenAddEducation] = useState(false);
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 992px)'})
    const handleClickAddEducation = () => {
        setOpenAddEducation(true);
    }
    const handleClickEdit = (id) => {
    }
    const handleClickDelete = (id) => {
    }
    const handleCommentButtonClick = (commentId) => {
        setCommentEditButtons((prevButtons) => ({
            ...prevButtons,
            [commentId]: !prevButtons[commentId],
        }));
    };
    return <section>
        <div className={styles.row_title}>
            <h1 className={panelCss.title}>Education</h1>
            <div className={`button_dark ${styles.button_save}`} onClick={handleClickAddEducation}>Add education</div>
        </div>
        <div className={styles.row}>
            <div className={`${panelCss.container} ${styles.container}`}>
                <div>Merhaba</div>
                {!isTabletOrMobile && <div className={panelCss.comment_button}>
                    <HiDotsVertical
                        onClick={() => handleCommentButtonClick(1)}
                    />
                    <OutsideClickHandler
                        onOutsideClick={() => setCommentEditButtons({})}
                    >
                        <div
                            className={`${panelCss.button_edit} ${commentEditButtons[1] ? panelCss.button_active : ''}`}
                        >
                            <span onClick={() => handleClickEdit(1)}>Edit</span>
                            <span onClick={() => handleClickDelete(1)}>Delete</span>
                        </div>
                    </OutsideClickHandler>
                </div>}
                {isTabletOrMobile && (
                    <div className={`${panelCss.comment_button} ${styles.buttons}`}>
                        <div className={styles.edit_button} onClick={() => handleClickEdit(1)}>
                            Edit
                        </div>
                        <div className={styles.delete_button}
                             onClick={() => handleClickDelete(1)}>
                            Delete
                        </div>
                    </div>
                )}
            </div>
        </div>


    </section>
};

export default Education;
