import React, {useState} from 'react';
import styles from "./../../pages/course/course.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaCirclePlay} from "react-icons/fa6";
import {MdOutlineLibraryBooks, MdOutlineQuiz} from "react-icons/md";
import {GiLevelEndFlag, GiTrophyCup} from "react-icons/gi";
import {PiInfinity} from "react-icons/pi";
import {FaMinus, FaPlus} from "react-icons/fa";
import {CiCreditCard1} from "react-icons/ci";
import {OutsideClickHandler} from "./../../hooks/boxOutSideClick";

function CourseReviewVideo() {
    return null;
}

const CourseVideo = (props) => {
    const {courseHeader, openVideo, setOpenVideo, courses} = props;
    const [cardAddToBasket, setAddToBasket] = useState(false);
    const previewVideos = courses.flatMap(course => (course.videos.filter(video => video.preview)));
    console.log("previewVideos", previewVideos)
    const handleOutsideClick = () => {
        setOpenVideo(false);
    };
    return (<div className={styles.course_right_section}>
        <div className={styles.course_card} onClick={() => {
            setOpenVideo(true)
        }}>
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
        {openVideo && (<>
            <div className={styles.all_reviews_background}></div>
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                <div className={styles.video_preview}>
                    <h6>Course Preview</h6>
                    <h3>{courseHeader.title}</h3>
                <CourseReviewVideo videoId={"13123"} videoUrl="/assets/video/trailer.mp4"  className={styles.video}/>
                    <h5>Free Sample Videos:</h5>

                    {previewVideos.map(video => (
                        <div className={styles.video_other_parent} key={video["guid"]}>
                        <div  className={styles.video_other}>

                            <LazyLoadImage src={`assets/image/video1.jpg`}
                                           alt={video["videoUrl"].split('/')[-1]}
                                           className={styles.video_other_video}
                            />
                            <span className={styles.video_other_video_title}>
                            <FaCirclePlay/>
                             <p className={styles.video_other_video_p}>
                                  {video["title"]}
                             </p>
                        </span> <span className={styles.video_other_video_p}>
                                {video["duration"]}

                            </span>
                        </div>
                    </div>))}

                </div>
            </OutsideClickHandler>
        </>)}
    </div>);
};

export default CourseVideo;
