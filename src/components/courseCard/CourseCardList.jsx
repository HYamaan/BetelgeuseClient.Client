import React, {useMemo} from 'react';
import SampleNextArrow from "@/components/courseCard/Arrow/SampleNextArrow";
import SamplePrevArrow from "@/components/courseCard/Arrow/SamplePrevArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dynamic from "next/dynamic";
const CourseCard = dynamic(() => import('../../components/courseCard/courseCard'))
const CourseCardList = () => {
    const courses = useMemo(
        () => [
            { id: 1, title: 'Course 1' },
            { id: 2, title: 'Course 2' },
            { id: 3, title: 'Course 3' },
            { id: 4, title: 'Course 4' },
            { id: 5, title: 'Course 5' },
            { id: 6, title: 'Course 6' },
            { id: 7, title: 'Course 7' },
            { id: 8, title: 'Course 8' },
            { id: 9, title: 'Course 9' },
            { id: 10, title: 'Course 10' },
        ],
        [] // empty dependency array, so it only runs once during the component mount
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow:<SampleNextArrow length={courses.length-4}/>,
        prevArrow:<SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow:null,
                    prevArrow:null,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    nextArrow:null,
                    prevArrow:null,
                }
            }
        ]
    };


    return (
        <Slider {...settings}>
            {courses.map((item, index) => (
                <React.Fragment key={index}>
                    <CourseCard  />
                </React.Fragment>
            ))}
        </Slider>
    );
};
export default CourseCardList;
