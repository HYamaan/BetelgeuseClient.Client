import React from 'react';
import styles from "./banner.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaShareAlt} from "react-icons/fa";

const Banner = () => {
    return <div className={styles.bannerSection}>
        <div className={styles.banner}  >
            <LazyLoadImage
                src={"/assets/image/course-breadcramb.png"}
                className={styles.banner_image}
                alt="circle"
            />
            <div className={styles.titleSection}>
                <h1>How To Teach Your Kid Easily</h1>
                <div className={styles.title_description}>
                    <p>Created by <span>George Hamilton</span></p>
                    <p>in <span>Articles</span></p>
                    <p>30 Jun 2021</p>
                    <p className={styles.share}><FaShareAlt/> <span>Share</span></p>
                </div>
            </div>
        </div>

    </div>
};

export default Banner;
