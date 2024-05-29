import React from 'react';
import styles from "@/components/panel/panel/UploadCourses/New/New.module.css";
import ContentComponent from "@/components/panel/panel/UploadCourses/ContentComponent/ContentComponent";
import Card from "@/components/panel/panel/UploadCourses/ContentComponent/Card";

const Content = () => {
    return <section className={styles.section}>
        <div className={styles.container}>
            <ContentComponent/>
            <Card/>
        </div>
    </section>
};

export default Content;
