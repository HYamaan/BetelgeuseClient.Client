import React from 'react';
import styles from "./../../pages/course/course.module.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaCalendarAlt, FaLanguage, FaRegClock, FaRegUser} from "react-icons/fa";
import {Rating} from "@mui/material";

const CourseBread = (props) => {
    const {courseHeader}=props;
    return (
        <section className={styles.bread_course_section}>
            <div className="container mx-auto">
                <div className={styles.bread_course}>
                    <div className={styles.bread_title}>{courseHeader.title}</div>
                    <div className={styles.bread_subtitle}>{courseHeader.description}</div>
                    <div className={styles.course_heading_info}>
                        <div className={styles.info_tag}>
                            <LazyLoadImage src={`assets/image/instructor/${courseHeader.instructor.image}`}
                                           alt={courseHeader.instructor.image}
                                           className={`${styles.info_tag_image} mb-1`}
                            />
                            <p className={styles.info_created_text}>Created by</p>
                            <p className={styles.info_created_instructor}>{courseHeader.instructor.name}</p>
                        </div>
                        <div className={styles.info_tag}>
                            <FaRegClock className={styles.info_tag_clock}/>
                            <span className={styles.info_clock_text}>{courseHeader.duration} Hours</span>
                        </div>
                        <div className={styles.info_tag}>
                            <FaRegUser className={styles.info_user_number_icon}/>
                            <span className={styles.info_user_number}>{courseHeader.enrolled}</span>
                            <span className={styles.info_user_number}>Enrolled</span>
                        </div>
                        <div className={styles.info_tag}>
                            <div className={styles.icon}>
                                <Rating name="half-rating-read" defaultValue={courseHeader.stars} precision={0.5}
                                        readOnly/>
                            </div>
                            <span className={styles.icon_text}>
                            ({courseHeader.reviews.count} Reviews)
                          </span>
                        </div>
                    </div>

                    <div className={`${styles.course_heading_info} ${styles.language_calender_section}`}>
                        <div className={styles.language_calender}>
                            <FaLanguage className={styles.language_calender_icon}/>
                            <span className={styles.language_calender_text}>English</span>
                        </div>
                        <div className={styles.language_calender}>
                            <FaCalendarAlt className={`${styles.language_calender_icon} mb-1`}/>
                            <span className={styles.calender_update_text}>Last updated</span>
                            <span className={styles.language_calender_text}>Thu, 13-Jul-2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseBread;
