import styles from "./course.module.css"
import React, {useState} from 'react';
import courseJSON from "./../../data/CourseVideo.json"
import CourseDescription from "./../../components/course/CourseDescription";
import CourseVideo from "./../../components/course/CourseVideo";
import CourseBread from "./../../components/course/CourseBread";
import useDisableBodyScroll from "./../../hooks/useDisableBodyScroll";

const Course = () => {
    const { courseHeader, willLearnJson, reviews,courses} = courseJSON;
    const [allStudentReview, setAllStudentReview] = useState(false);
    const [openVideo,setOpenVideo]=useState(false);
    useDisableBodyScroll(!allStudentReview);
    useDisableBodyScroll(!openVideo);
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
                    />
                    </div>
                    <div className={styles.course_right}>
                       <CourseVideo
                           courseHeader={courseHeader}
                           setOpenVideo={setOpenVideo}
                           openVideo={openVideo}
                           courses={courses}
                       />
                    </div>
                </div>

            </div>
        </section>
    </div>
};

export default Course;
