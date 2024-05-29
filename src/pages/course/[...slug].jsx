import styles from "./course.module.css"
import React, { useState} from 'react';
import CourseDescription from "../../components/course/CourseDescription";
import CourseVideo from "../../components/course/CourseVideo";
import CourseBread from "../../components/course/CourseBread";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import {fetchCourses} from "@/lib/fetch";

const Course = ({courseHeader, willLearnJson, reviews, courses,guid}) => {
    const [allStudentReview, setAllStudentReview] = useState(false);
    const [openVideo,setOpenVideo]=useState(false);
    const [openVideoJson,setOpenVideoJson]=useState({});

    useDisableBodyScroll(allStudentReview || openVideo);
    return <div className={`${allStudentReview ? 'open' : ''} ${openVideo ? 'open' : ''}`}>
        <CourseBread courseHeader={courseHeader}/>
        <section className="container mx-auto">
            <div className={`${styles.course_description}`}>
                <div className={styles.course_description_row}>
                    <div className={styles.course_left}>
                        <CourseDescription
                            courseHeader={courseHeader}
                            courseReviews={reviews}
                            courseWillLearnJson={willLearnJson}
                            setAllStudentReview={setAllStudentReview}
                            allStudentReview={allStudentReview}
                            setOpenVideoJson={setOpenVideoJson}
                            setOpenVideo={setOpenVideo}
                        />
                    </div>
                    <div className={styles.course_right}>
                        <CourseVideo
                            courseHeader={courseHeader}
                            guid={guid}
                            reviews={reviews}
                            setOpenVideo={setOpenVideo}
                            openVideo={openVideo}
                            courses={courses}
                            openVideoJson={openVideoJson}
                            setOpenVideoJson={setOpenVideoJson}
                        />
                    </div>
                </div>

            </div>
        </section>
    </div>
};

export default Course;
export async function getServerSideProps({params}) {
    const courseUrl =params.slug[0];
    const courseData=await fetchCourses();
    const foundCourse = courseData.find(value => value.url === courseUrl);

    if (foundCourse !== undefined && foundCourse !== null) {
        console.log("burada",courseUrl)
        const { courseHeader, willLearnJson, reviews, courses,guid} = foundCourse;
        return {
            props: {courseHeader, willLearnJson, reviews, courses,guid},
        };
    } else {
        console.error(`Course not found for guid: ${courseUrl}`);
        return {
            notFound: true,
        };
    }
}
