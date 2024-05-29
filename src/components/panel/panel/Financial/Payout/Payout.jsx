import React from 'react';
import styles from "./payout.module.css"
import panelCss from "@/components/panel/panel/panel.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";

const Payout = () => {
    return <div className={styles.section}>
        <h1 className={panelCss.title}>Account summary</h1>
        <div className={panelCss.container}>
            <div className={styles.payout_row}>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/account-charge.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>$251.40</p>
                        <p className={panelCss.status_summary_content_title}>Account charge</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/ready-to-payout.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>$46.50</p>
                        <p className={panelCss.status_summary_content_title}>Ready to payout</p>
                    </div>
                </div>
                <div className={panelCss.status_summary_row_item}>
                    <div className={panelCss.status_summary_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/total-income.svg"}
                            alt="circle"
                        />
                        <p className={panelCss.status_summary_content_count}>$46.50</p>
                        <p className={panelCss.status_summary_content_title}>Total income</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Payout;
