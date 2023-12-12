import React from 'react';
import styles from './home.module.css';
import Image from 'next/image';
import {AiOutlinePlus} from "react-icons/ai";

import CourseCardList from "./../../components/courseCard/CourseCardList";
const HomePage = () => {


    return <>
        <div className={styles.backgrounBannerImage}>
            <div className="container mx-auto ">
                <div className={styles.banner_row}>
                    <div className={styles.banner_description}>
                        <div className={styles.banner_description_first}>Discover your journey</div>
                        <div className={styles.banner_description_banner_second}>Discover 45<span>00+</span> Courses
                            from top Instructors Around the World
                        </div>
                        <div className={styles.banner_description_third}>Take your learning organization to the next
                            level. to the next level. Who will share their knowledge to people around the world.
                        </div>
                        <div className={styles.button}>
                            Hemen Kaydolun
                        </div>
                    </div>
                    <div className={styles.banner_image}>
                        <Image src={`/assets/image/shape/shape-01.png`} width={60} height={60} alt="shape"
                               className={styles.shape_01}/>
                        <Image src={`/assets/image/shape/shape-02.png`} width={40} height={40} alt="shape"
                               className={styles.shape_02}/>
                        <div className={styles.shape_04}>
                            <Image src={`/assets/image/shape/shape-04.png`} width={75} height={75} alt="shape"
                                   className="text-center"/>
                            <h5>Top Rated Instructors</h5>
                        </div>
                        <Image src={`/assets/image/shape/slider-shape-06.png`} width={175} height={175} alt="shape"
                               className={styles.shape_06}/>
                        <div className={styles.shape_05}>
                            <div className={styles.course_card}>
                                <Image src={`/assets/image/shape/shape-05.png`} width={25} height={25} alt="shape"
                                       className={styles.course_card_image}/>
                                <span className={styles.course_card_icon_plus_parent}><AiOutlinePlus
                                    className={styles.course_card_icon_plus}/></span>
                            </div>
                            <h5 className={styles.course_card_title}>More than 21,500+ students enrolled around the
                                world</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="w-4/5 mx-auto">
            <h1 className={styles.top_courses}>Top courses</h1>
            <CourseCardList/>
        </section>

    </>
};

export default HomePage;
