import React, {useEffect, useState} from 'react';
import styles from './Notifications.module.css';
import panelCss from "@/components/panel/panel/panel.module.css";
import {IoMdCheckmark} from "react-icons/io";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";

const Notifications = () => {
    const [show, setShow] = useState(false);
    const showPopUp = (item) => {
        setShow(true);
        console.log("item", show);
    }
    useEffect(() => {
        console.log("item", show);
    }, [show]);
    return <section>
        <div className={styles.section_title}>
            <h1 className={panelCss.title}>Notifications</h1>
            <div className={styles.checkSection}>
                <IoMdCheckmark/>
                <p>Mark all notifications as read</p>
            </div>
        </div>
        <div className={`${panelCss.container} ${styles.container}`}>
            <div className={styles.row}>
                <div className={styles.titles}>
                    <h3>Installment verification request approved</h3>
                    <p><span>1 Feb 2024 |</span> <span>14:42</span></p>
                </div>
                <div className={styles.description}>Your verification request for Installment payment On Christmas
                    approved.
                </div>
                <div className={styles.view} onClick={() => showPopUp(1)}>View</div>
                {show && (<div className={styles.popUp}>
                        <OutsideClickHandler onOutsideClick={() => setShow(!show)}>
                            <div className={`${panelCss.container} ${styles.popupDescription}`}>
                                <h3>Installment verification request approved</h3>
                                <p className={styles.date}><span>1 Feb 2024 |</span> <span>14:42</span></p>
                                <p className={styles.popup_description}>Your verification request for Installment
                                    payment On
                                    Christmas
                                    approved.</p>
                            </div>
                        </OutsideClickHandler>
                    </div>
                )}
            </div>
        </div>
        <div className={`${panelCss.container} ${styles.container}`}>
            <div className={styles.row}>
                <div className={styles.unRead}>
                    <span className={styles.unRead_block}></span>
                    <div className={styles.titles}>
                        <h3>Installment verification request approved</h3>
                        <p><span>1 Feb 2024 |</span> <span>14:42</span></p>
                    </div>
                </div>
                <div className={styles.description}>Your verification request for Installment payment On Christmas
                    approved.
                </div>
                <div className={styles.view} onClick={() => showPopUp(1)}>View</div>
                {show && (<div className={styles.popUp}>
                        <OutsideClickHandler onOutsideClick={() => setShow(!show)}>
                            <div className={`${panelCss.container} ${styles.popupDescription}`}>
                                <h3>Installment verification request approved</h3>
                                <p className={styles.date}><span>1 Feb 2024 |</span> <span>14:42</span></p>
                                <p className={styles.popup_description}>Your verification request for Installment
                                    payment On
                                    Christmas
                                    approved.</p>
                            </div>
                        </OutsideClickHandler>
                    </div>
                )}
            </div>
        </div>
    </section>
};

export default Notifications;
