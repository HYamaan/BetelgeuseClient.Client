import React from 'react';
import styles from './HomeVideoMask.module.css'
import Image from 'next/image'
import {CiPlay1} from "react-icons/ci";

const HomeVideoMask = () => {
    return (
        <section className={styles.section}>
            <div className={styles.videoMask}></div>
            <Image
                src="/assets/image/home_video_section.png"
                width={1140}
                height={553}
                className={styles.videoMaskImage}
                alt="home_video_section"/>
            <div className={styles.PlaySvg}>
                <CiPlay1/>
            </div>
          {/*<div className={styles.svgContainer}>*/}
          {/*    <CiPlay1 className={styles.VideoMaskImage_svg}/>*/}
          {/*</div>*/}
            <div className={styles.text}>
                <h1>Start learning anywhere, anytime...</h1>
                <p>Use Rocket LMS to access high-quality education materials without any limitations in the easiest way.</p>
            </div>
        </section>
    );
};

export default HomeVideoMask;
