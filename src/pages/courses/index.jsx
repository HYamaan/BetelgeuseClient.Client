import React, {useState} from 'react';
import styles from './courses.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaHome} from "react-icons/fa";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {IoFilter} from "react-icons/io5";
import categoriesJson from '@/data/Categories.json'
import {uniqueArrayReturnIdAndName} from "@/lib/uniqeArray";
import CoursesRadio from "@/components/courses/CoursesRadio";
import CourseCardComponent from "@/components/courseCard/courseCard";

const Courses = () => {
    const [checkedCategory, setCheckedCategory] = useState(null);
    const [checkedPrice, setCheckedPrice] = useState(null);
    const [checkedLevel, setCheckedLevel] = useState(null);
    const [checkedLanguage, setCheckedLanguage] = useState(null);
    const [checkedDuration, setCheckedDuration] = useState(null);
    const [checkedRatings, setCheckedRatings] = useState(null);
    const categoriesFilter = uniqueArrayReturnIdAndName(categoriesJson.categories);
    const [showAllCategories, setShowAllCategories] = useState(false);


    return <>
        <div className={styles.courses_header}>
            <div className={styles.courses_header_description}>
                <div className={styles.courses_header_direction}>
                    <FaHome className="mr-2"/>
                    <span>Home</span>
                    <MdOutlineArrowForwardIos/>
                    <span>Courses</span>
                </div>
                <p className={styles.courses_header_title}>Courses</p>
            </div>
            <div className={styles.courses_header_book_img}>
                <LazyLoadImage src={`/assets/image/courses-brd-book.png`}
                               alt="courses-brd-book"
                />
            </div>
        </div>
        <main className={styles.courses_main}>
                <div className={styles.course_filter_button}>
                    <IoFilter/>
                    Filter
                </div>
                <div>
            </div>
            <section className={styles.course_section}>
                <div className={styles.course_filter}>
                    <CoursesRadio
                        valueArray={categoriesFilter}
                        stateValue={checkedCategory}
                        setStateValue={setCheckedCategory}
                        showAll={showAllCategories}
                        setShowAll={setShowAllCategories}
                        title={"Categories"}
                    />

                    <CoursesRadio
                        valueArray={categoriesJson.price}
                        stateValue={checkedPrice}
                        setStateValue={setCheckedPrice}
                        title={"Price"}
                    />
                    <CoursesRadio
                        valueArray={categoriesJson.level}
                        stateValue={checkedLevel}
                        setStateValue={setCheckedLevel}
                        title={"Level"}
                    />
                    <CoursesRadio
                        valueArray={categoriesJson.language}
                        stateValue={checkedLanguage}
                        setStateValue={setCheckedLanguage}
                        title={"Language"}
                    />
                    <CoursesRadio
                        valueArray={categoriesJson.duration}
                        stateValue={checkedDuration}
                        setStateValue={setCheckedDuration}
                        title={"Video Duration"}
                    />
                    <CoursesRadio
                        valueArray={categoriesJson.ratings}
                        stateValue={checkedRatings}
                        setStateValue={setCheckedRatings}
                        stars={true}
                        title={"Ratings"}
                    />

                </div>
                <div className={styles.courses_detail}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <CourseCardComponent />
                        <CourseCardComponent />
                        <CourseCardComponent />
                        <CourseCardComponent />
                        <CourseCardComponent />
                        <CourseCardComponent />
                    </div>

                </div>
            </section>
        </main>
    </>
};

export default Courses;
