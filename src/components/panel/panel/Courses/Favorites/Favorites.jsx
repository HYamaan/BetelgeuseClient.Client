import React from 'react';
import panelCss from "@/components/panel/panel/panel.module.css";
import CourseCard from "@/components/panel/panel/Courses/CourseCard/CourseCard";
import {fetchPanelFavoritesCourse} from "@/lib/fetch";

const Favorites = () => {
    return <>
        <h1 className={panelCss.title}>My Favorites</h1>
        <section>
            <CourseCard
                AxiosName={fetchPanelFavoritesCourse}
            />
        </section>
    </>
};

export default Favorites;
