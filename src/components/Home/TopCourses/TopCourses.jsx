import React from 'react';
import styles from "@/pages/home/home.module.css";
import CourseCardList from "@/components/courseCard/CourseCardList";

const TopCourses = () => {
    return (
        <section className="w-4/5 mx-auto">
            <h1 className={styles.top_courses}>Top courses</h1>
            <CourseCardList/>
        </section>
    );
};

export default TopCourses;
