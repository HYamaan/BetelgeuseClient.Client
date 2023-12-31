import React from 'react';
import Header from "@/components/Home/Header/Header";
import TopCategories from "@/components/Home/TopCategories/PopulerCategories";
import TopCourses from "@/components/Home/TopCourses/TopCourses";
import Promotion from "@/components/Home/Promotion/Promotion";
import HomeVideoMask from "@/components/Home/HomeVideoMask/HomeVideoMask";
const HomePage = () => {
    return <>
        <Header/>
        <TopCourses/>
        <TopCategories/>
        <Promotion/>
        <HomeVideoMask/>
    </>
};

export default HomePage;
