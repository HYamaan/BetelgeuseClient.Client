import React, {useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "./Images.module.css";
import OneFileUpload from "@/components/ui/Panel/OneFileUpload";
import panelCss from "@/components/panel/panel/panel.module.css";

const Images = () => {
    const [profileFile, setProfileFile] = useState([]);
    const [backgroundFile, setBackgroundFile] = useState([]);
    return <section className={styles.section}>
        <h1 className={panelCss.title}>Image</h1>
        <div className={styles.row}>
            <div className={styles.profile_image}>
                <p className={`${panelCss.specific_date_title} self-start mt-4`}>Profile Image</p>
                <LazyLoadImage src={`assets/image/instructor/demo_instructor.jpg`}
                               alt="demo_instructor.jpg"
                               effect="opacity"
                               className={styles.image_cover}

                />
                <OneFileUpload title="Attach a file" file={profileFile} setFile={setProfileFile}/>
            </div>
            <div className={`${styles.profile_image} ${styles.profile_background}`}>
                <p className={`${panelCss.specific_date_title} self-start mt-4`}>Profile Image</p>
                <LazyLoadImage src={`assets/image/instructor/demo_instructor.jpg`}
                               alt="demo_instructor.jpg"
                               effect="opacity"
                               className={styles.background_image_cover}
                />
                <OneFileUpload title="Attach a file" file={backgroundFile} setFile={setBackgroundFile}/>
            </div>
        </div>
    </section>
};

export default Images;
