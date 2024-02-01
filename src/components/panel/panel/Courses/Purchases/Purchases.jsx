import React from 'react';
import panelCss from './../../panel.module.css'
import styles from './purchases.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";

import CourseCard from "@/components/panel/panel/Courses/CourseCard/CourseCard";

import {fetchPanelPurchasesCourse} from "@/lib/fetch";

const Purchases = () => {
    return <>
        <h1 className={panelCss.title}>My activity</h1>
        <section className={styles.activities_container}>
            <div className={panelCss.panel_row}>
                <div className={styles.activities_col_4}>
                    <div className={styles.activities_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/webinars.svg"}
                            alt="circle"
                        />
                        <p className={styles.activities_content_count}>13</p>
                        <p className={styles.activities_content_title}>Purchased</p>
                    </div>
                </div>
                <div className={styles.activities_col_4}>
                    <div className={styles.activities_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/hours.svg"}
                            alt="circle"
                        />
                        <p className={styles.activities_content_count}>29:05</p>
                        <p className={styles.activities_content_title}>Hours</p>
                    </div>
                </div>
                <div className={styles.activities_col_4}>
                    <div className={styles.activities_content}>
                        <LazyLoadImage
                            src={"/assets/image/background/panel/upcoming.svg"}
                            alt="circle"
                        />
                        <p className={styles.activities_content_count}>13</p>
                        <p className={styles.activities_content_title}>Purchased</p>
                    </div>
                </div>
            </div>
        </section>
        <h1 className={panelCss.title}>My purchases</h1>
        <section>
            <CourseCard
                AxiosName={fetchPanelPurchasesCourse}
            />
        </section>

    </>
};

export default Purchases;
