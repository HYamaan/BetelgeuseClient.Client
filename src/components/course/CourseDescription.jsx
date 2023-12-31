import React, {useState} from 'react';
import styles from "./../../pages/course/course.module.css";
import courseJSON from "./../../data/CourseVideo.json";
import {IoIosArrowUp} from "react-icons/io";
import {FaRegCirclePlay} from "react-icons/fa6";
import {GoDotFill} from "react-icons/go";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaCheck, FaPlayCircle, FaStar} from "react-icons/fa";
import {TbCertificate} from "react-icons/tb";
import {HiUsers} from "react-icons/hi";
import { Rating} from "@mui/material";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {calculateStarsRatio} from "@/hooks/calculate";
import UserReviewInfo from "@/components/course/UserReviewInfo";

const CourseDescription = (props) => {
    const{courseReviews,courseHeader,courseWillLearnJson,allStudentReview,setAllStudentReview,setOpenVideoJson,setOpenVideo}=props;
    const starsRatio = calculateStarsRatio(courseReviews["studentReviews"]);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const totalItems = courseWillLearnJson.length;
    const halfLength = totalItems / 2;

    const renderItems = (start, end) => courseWillLearnJson.slice(start, end).map(value => (
        <div className={styles.course_learn_text} key={value["guid"]}>
            <FaCheck className={styles.course_learn_text_icon}/>
            {value["willLearnTitle"]}
        </div>));
    const handleOutsideClick = () => {
        setAllStudentReview(false);
    };

    return (
        <div className={styles.course_left_side}>
            <>
                {/*Will Learn Start*/}
                <div className={styles.course_learn_wrapper}>
                    <h2 className={styles.course_will_learn_title}>What you&apos;ll learn</h2>
                    <div className={styles.course_will_learn_section}>
                        <div className={styles.course_will_learn}>
                            {renderItems(0, halfLength)}
                        </div>
                        <div className={styles.course_will_learn}>
                            {renderItems(halfLength, totalItems)}
                        </div>
                    </div>
                </div>
                {/*Will Learn End*/}
                {/*Will Video Start*/}
                <h2 className={styles.course_content_title}>Course content</h2>
                {courseJSON.courses.map((value, index) => (
                    <div className={styles.accordion} key={value["guid"]}>
                        <div className={styles.accordion_item}>
                            <h2 className={styles.accordion_header} onClick={() => {
                                setActiveAccordion(index === activeAccordion ? null : index);
                            }}>
                                <div className={styles.accordion_header_left}>
                                    <IoIosArrowUp
                                        className={`${styles.accordion_header_left_icon} ${activeAccordion === index ? styles.rotate : ''}`}/>
                                    <span
                                        className={styles.accordion_item_title}>{value.title}</span>
                                </div>
                                <div className={styles.accordion_header_right}>
                                    <span>{value["totalLessons"]} Lessons</span>
                                    <span>{value["totalDuration"]} Hours</span>
                                </div>
                            </h2>
                            {activeAccordion === index && (value.videos.map(videoValue => (<div
                                className={`${styles.accordion_body} ${activeAccordion === index ? styles.open : ''}`}
                                onClick={videoValue.preview ? () => {setOpenVideoJson(videoValue); setOpenVideo(true)} : undefined}
                                key={videoValue["guid"]}>
                                <div
                                    className={styles.accordion_lecture + (videoValue.preview ? ` ${styles.accordion_lecture_hover}` : '')}>
                                    <div className={styles.accordion_lecture_left}>
                                        <FaRegCirclePlay
                                            className={styles.accordion_lecture_left_icon}/>
                                        {videoValue.title}
                                    </div>
                                    <div className={styles.accordion_lecture_right}>
                                        {videoValue.preview &&
                                            <span className="mr-5">preview</span>}
                                        <span>{videoValue.duration}</span>
                                    </div>
                                </div>
                            </div>)))}
                        </div>
                    </div>))}
                {/*Will Video END*/}
            </>
            <div>
                <h2 className={styles.course_content_title}>Requirements</h2>
                {courseHeader["courseRequirements"].map((requirement, key) => (
                    <div key={key} className={styles.requirement_detail}>
                        <GoDotFill/> <span>{requirement}</span>
                    </div>))}
            </div>
            <div>
                <h2 className={styles.course_content_title}>Description</h2>
                <p className={styles.course_general_description}>{courseHeader["CourseGeneralDescription"]}</p>
            </div>
            <div className={styles.instructor_section}>
                <h2 className={styles.course_content_title}>Instructor</h2>
                <div className={styles.instructor_section_info}>
                    <LazyLoadImage src={`assets/image/instructor/${courseHeader["instructor"].image}`}
                                   alt={courseHeader["instructor"].image}
                                   className={`${styles.instructor_image} `}
                    />
                    <div>
                        <p className={styles.instructor_name}>{courseHeader["instructor"].name}</p>
                        <p className={styles.instructor_specializations}>{courseHeader["instructor"]["specializations"]}</p>
                        <div className={styles.instructor_info}>
                            <p>
                                <FaStar/>
                                <span>{courseHeader["instructor"]["rating"]} Instructor Rating</span>
                            </p>
                            <p>
                                <TbCertificate/>
                                <span>{courseHeader["instructor"]["reviews"]} Reviews</span>
                            </p>
                            <p>
                                <HiUsers/>
                                <span>{courseHeader["instructor"]["students"]} Students</span>
                            </p>
                            <p>
                                <FaPlayCircle/>
                                <span>{courseHeader["instructor"].courses} Courses</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.instructor_biography}>{courseHeader["instructor"]["biography"]}</div>
            </div>
            <div className={styles.review_section}>
                <h2 className={styles.review_section_title}>
                    <span><FaStar className={styles.star}/> {courseReviews["averageRating"]} course rating</span>
                    <span><GoDotFill/> {courseReviews["totalReviews"]} ratings</span>
                </h2>
                <div className={styles.student_review}>
                    {courseReviews["studentReviews"].slice(0, 4).map(reviewsValue => (
                        <div className="flex-[45%]" key={reviewsValue["guid"]}>
                            <UserReviewInfo reviewsValue={reviewsValue}/>
                            <div className={styles.review_user_comment}>
                                {reviewsValue["comment"]}
                            </div>
                        </div>))}
                </div>
                <div className={styles.all_reviews_button}
                     onClick={() => {
                         setAllStudentReview(true)
                     }}>Show all reviews
                </div>
                {allStudentReview && (<>
                    <div className={styles.all_reviews_background}></div>
                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                        <div className={styles.all_reviews}>
                            <h2 className={`${styles.review_section_title}`}>
                                                    <span><FaStar
                                                        className={styles.star}/> {courseReviews["averageRating"]} course rating</span>
                                <span><GoDotFill/> {courseReviews["totalReviews"]} ratings</span>
                            </h2>
                            <div className="flex h-[90%]">
                                <div className=" flex-[33%] basis-1/3 ">
                                    {Object.entries(starsRatio).map(([key, value]) => (
                                        <div className={styles.all_reviews_rating} key={key}>
                                            <div
                                                className={styles.all_reviews_rating_summary_widget}>
                                                <div
                                                    className={styles.all_reviews_rating_summary_widget_sub}
                                                    style={{width: `${starsRatio[key].toFixed(2)}%`}}
                                                ></div>

                                            </div>
                                            <div className={styles.review_star}>
                                                <Rating name="half-rating-read"
                                                        defaultValue={5}
                                                        precision={0.5}
                                                        readOnly/>
                                                <p>{starsRatio[key].toFixed(2)}%</p>
                                            </div>
                                        </div>))}

                                </div>
                                <div className="flex-[50%] h-full ">
                                    <div className=" h-full overflow-y-scroll">
                                        {courseReviews["studentReviews"].map(reviewsValue => (
                                            <div className="flex-[45%]"
                                                 key={reviewsValue["guid"]}>
                                                <UserReviewInfo reviewsValue={reviewsValue}/>
                                                <div className={styles.review_user_comment_all}>
                                                    {reviewsValue["comment"]}
                                                </div>
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OutsideClickHandler></>)}
            </div>
        </div>
    );
};

export default CourseDescription;
