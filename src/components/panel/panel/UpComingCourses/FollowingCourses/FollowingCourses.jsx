import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import CourseCard from "@/components/panel/panel/Courses/CourseCard/CourseCard";
import {fetchPanelFollowingCourse} from "@/lib/fetch";

const FollowingCourses = () => {
    return <>
        <h1 className={panelCss.title}>Following courses</h1>
        <section>
            <CourseCard
                AxiosName={fetchPanelFollowingCourse}
            />
        </section>
    </>
};

export default FollowingCourses;
