import styles from "./course.module.css"
import React, {useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {
    FaCalendarAlt, FaCheck, FaLanguage, FaMinus, FaPlayCircle, FaPlus, FaRegClock, FaRegUser, FaStar
} from "react-icons/fa";
import {IoIosArrowUp} from "react-icons/io";
import {FaCirclePlay, FaRegCirclePlay} from "react-icons/fa6";
import courseJSON from "./../../data/CourseVideo.json"
import {Avatar, Rating} from "@mui/material";
import {deepPurple, yellow} from '@mui/material/colors';
import {TbCertificate} from "react-icons/tb";
import {HiUsers} from "react-icons/hi";
import {GoDotFill} from "react-icons/go";
import {calculateStarsRatio} from "@/hooks/calculate";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import {MdOutlineLibraryBooks, MdOutlineQuiz} from "react-icons/md";
import {GiLevelEndFlag, GiTrophyCup} from "react-icons/gi";
import {PiInfinity} from "react-icons/pi";
import {CiCreditCard1} from "react-icons/ci";

const Course = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [allStudentReview, setAllStudentReview] = useState(false);
    const [cardAddToBasket, setAddToBasket] = useState(false);
    const courseHeader = courseJSON.courseHeader;
    const courseReviews = courseJSON.reviews;
    const starsRatio = calculateStarsRatio(courseReviews.studentReviews);
    const totalItems = courseJSON.willLearnJson.length;
    const halfLength = totalItems / 2;
    const handleOutsideClick = () => {
        setAllStudentReview(false);
    };

    const renderItems = (start, end) => courseJSON.willLearnJson.slice(start, end).map(value => (
        <div className={styles.course_learn_text} key={value.guid}>
            <FaCheck className={styles.course_learn_text_icon}/>
            {value.willLearnTitle}
        </div>));

    return <>
        <section className={styles.bread_course_section}>
            <div className="container mx-auto">
                <div className={styles.bread_course}>
                    <div className={styles.bread_title}>{courseHeader.title}</div>
                    <div className={styles.bread_subtitle}>{courseHeader.description}</div>
                    <div className={styles.course_heading_info}>
                        <div className={styles.info_tag}>
                            <LazyLoadImage src={`assets/image/instructor/${courseHeader.instructor.image}`}
                                           alt={courseHeader.instructor.image}
                                           className={`${styles.info_tag_image} mb-1`}
                            />
                            <p className={styles.info_created_text}>Created by</p>
                            <p className={styles.info_created_instructor}>{courseHeader.instructor.name}</p>
                        </div>
                        <div className={styles.info_tag}>
                            <FaRegClock className={styles.info_tag_clock}/>
                            <span className={styles.info_clock_text}>{courseHeader.duration} Hours</span>
                        </div>
                        <div className={styles.info_tag}>
                            <FaRegUser className={styles.info_user_number_icon}/>
                            <span className={styles.info_user_number}>{courseHeader.enrolled}</span>
                            <span className={styles.info_user_number}>Enrolled</span>
                        </div>
                        <div className={styles.info_tag}>
                            <div className={styles.icon}>
                                <Rating name="half-rating-read" defaultValue={courseHeader.stars} precision={0.5}
                                        readOnly/>
                            </div>
                            <span className={styles.icon_text}>
                            ({courseHeader.reviews.count} Reviews)
                          </span>
                        </div>
                    </div>

                    <div className={`${styles.course_heading_info} ${styles.language_calender_section}`}>
                        <div className={styles.language_calender}>
                            <FaLanguage className={styles.language_calender_icon}/>
                            <span className={styles.language_calender_text}>English</span>
                        </div>
                        <div className={styles.language_calender}>
                            <FaCalendarAlt className={`${styles.language_calender_icon} mb-1`}/>
                            <span className={styles.calender_update_text}>Last updated</span>
                            <span className={styles.language_calender_text}>Thu, 13-Jul-2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*COURSE DESCRIPTION START*/}
        <section className="container mx-auto">
            <div className={`${styles.course_description}`}>
                <div className={styles.course_description_row}>
                    <div className={styles.course_left}>
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
                                                    key={videoValue.guid}>
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
                                {courseHeader.courseRequirements.map((requirement, key) => (
                                    <div key={key} className={styles.requirement_detail}>
                                        <GoDotFill/> <span>{requirement}</span>
                                    </div>))}
                            </div>
                            <div>
                                <h2 className={styles.course_content_title}>Description</h2>
                                <p className={styles.course_general_description}>{courseHeader.CourseGeneralDescription}</p>
                            </div>
                            <div className={styles.instructor_section}>
                                <h2 className={styles.course_content_title}>Instructor</h2>
                                <div className={styles.instructor_section_info}>
                                    <LazyLoadImage src={`assets/image/instructor/${courseHeader.instructor.image}`}
                                                   alt={courseHeader.instructor.image}
                                                   className={`${styles.instructor_image} `}
                                    />
                                    <div>
                                        <p className={styles.instructor_name}>{courseHeader.instructor.name}</p>
                                        <p className={styles.instructor_specializations}>{courseHeader.instructor.specializations}</p>
                                        <div className={styles.instructor_info}>
                                            <p>
                                                <FaStar/>
                                                <span>{courseHeader.instructor.rating} Instructor Rating</span>
                                            </p>
                                            <p>
                                                <TbCertificate/>
                                                <span>{courseHeader.instructor.reviews} Reviews</span>
                                            </p>
                                            <p>
                                                <HiUsers/>
                                                <span>{courseHeader.instructor.students} Students</span>
                                            </p>
                                            <p>
                                                <FaPlayCircle/>
                                                <span>{courseHeader.instructor.courses} Courses</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.instructor_biography}>{courseHeader.instructor.biography}</div>
                            </div>
                            <div className={styles.review_section}>
                                <h2 className={styles.review_section_title}>
                                    <span><FaStar className={styles.star}/> {courseReviews["averageRating"]} course rating</span>
                                    <span><GoDotFill/> {courseReviews["totalReviews"]} ratings</span>
                                </h2>
                                <div className={styles.student_review}>
                                    {courseReviews.studentReviews.slice(0, 4).map(reviewsValue => (
                                        <div className="flex-[45%]" key={reviewsValue["guid"]}>
                                            <div className={styles.review_user_info}>
                                                <Avatar
                                                    alt={reviewsValue["name"]}
                                                    src={reviewsValue["image"]}
                                                    sx={{bgcolor: deepPurple.A700}}
                                                />
                                                <div>
                                                    <h4>{reviewsValue["name"].split(' ')[0]} {reviewsValue["name"].split(' ')[1][0]}.</h4>
                                                    <div className={styles.review_star}>
                                                        <Rating name="half-rating-read"
                                                                defaultValue={reviewsValue["stars"]}
                                                                precision={0.5}
                                                                readOnly/>
                                                        <p>{reviewsValue["date"]}</p>
                                                    </div>
                                                </div>
                                            </div>
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
                                                            {courseReviews.studentReviews.map(reviewsValue => (
                                                                <div className="flex-[45%]"
                                                                     key={reviewsValue["guid"]}>
                                                                    <div className={styles.review_user_info}>
                                                                        <Avatar
                                                                            alt={reviewsValue["name"]}
                                                                            src={reviewsValue["image"]}
                                                                            sx={{bgcolor: deepPurple.A700}}
                                                                        />
                                                                        <div>
                                                                            <h4>{reviewsValue["name"].split(' ')[0]} {reviewsValue["name"].split(' ')[1][0]}.</h4>
                                                                            <div className={styles.review_star}>
                                                                                <Rating name="half-rating-read"
                                                                                        defaultValue={reviewsValue["stars"]}
                                                                                        precision={0.5}
                                                                                        readOnly/>
                                                                                <p>{reviewsValue["date"]}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                    </div>

                    <div className={styles.course_right}>
                        <div className={styles.course_right_section}>
                            <div className={styles.course_card}>
                                <div className={styles.card_img}>
                                    <div className={styles.course_img}>
                                        <LazyLoadImage src={`assets/image/video1.jpg`}
                                                       alt="video1.jpg"
                                        />
                                        <FaCirclePlay className={styles.course_card_svg}/>
                                    </div>
                                </div>
                                <div className={styles.card_ammount}>
                                    <h1>$10</h1>
                                    <h3>
                                        <del>$11.56</del>
                                    </h3>
                                </div>
                                <div className={styles.enrol}>
                                    <div className={styles.icon}>
                                        <MdOutlineLibraryBooks style={{"color": "#FF5C5C"}}/>
                                        Lectures
                                    </div>
                                    <h5>{courseHeader.courseDetails.lectures}</h5>
                                </div>
                                <div className={styles.enrol}>
                                    <div className={styles.icon}>
                                        <MdOutlineQuiz style={{"color": "#8F85FF"}}/>
                                        Quizzes
                                    </div>
                                    <h5>{courseHeader.courseDetails.quizzes}</h5>
                                </div>
                                <div className={styles.enrol}>
                                    <div className={styles.icon}>
                                        <GiLevelEndFlag style={{"color": "#0FFAA4"}}/>
                                        Skill level
                                    </div>
                                    <h5>{courseHeader.courseDetails.skillLevel}</h5>
                                </div>
                                <div className={styles.enrol}>
                                    <div className={styles.icon}>
                                        <PiInfinity className="" style={{"color": "#FF4433"}}/>
                                        Expiry period
                                    </div>
                                    <h5>{courseHeader.courseDetails.expiryPeriod}</h5>
                                </div>
                                <div className={styles.enrol}>
                                    <div className={styles.icon}>
                                        <GiTrophyCup/>
                                        Certificate
                                    </div>
                                    <h5>{courseHeader.courseDetails.certificate ? "Yes" : "No"}</h5>
                                </div>
                                {cardAddToBasket ? (<div className={styles.btn} onClick={() => {
                                    setAddToBasket(false)
                                }}>
                                    <FaMinus/>
                                    Remove from cart
                                </div>) : (<div className={styles.btn}
                                                onClick={() => {
                                                    setAddToBasket(true)
                                                }}>
                                    <FaPlus/>
                                    Add to cart
                                </div>)}
                                <div className={styles.btn}>
                                    <CiCreditCard1 className={styles.debit_card_icon}/>
                                    <span>Buy now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        {/*COURSE DESCRIPTION END*/}

    </>
};

export default Course;
