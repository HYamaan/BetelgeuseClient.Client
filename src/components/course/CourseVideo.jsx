import React, {useEffect, useState} from 'react';
import styles from "./../../pages/course/course.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaCirclePlay} from "react-icons/fa6";
import {MdOutlineLibraryBooks, MdOutlineQuiz} from "react-icons/md";
import {GiLevelEndFlag, GiTrophyCup} from "react-icons/gi";
import {PiInfinity} from "react-icons/pi";
import {FaHeart, FaMinus, FaPlus, FaRegHeart} from "react-icons/fa";
import {CiCreditCard1} from "react-icons/ci";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import CourseReviewVideo from "@/components/course/CourseReviewVideo";
import { removeToBasket, addToBasket } from '@/redux/features/ShoppingBasket/shoppingBasketSlice'
import {useDispatch} from "react-redux";

const CourseVideo = (props) => {
    const dispatch = useDispatch()
    const {courseHeader, openVideo, setOpenVideo, courses,openVideoJson,setOpenVideoJson} = props;
    // const {courseNecessaryInformation,setCourseNecessaryInformation}=useState({});
    const [cardAddToBasket, setAddToBasket] = useState(false);
    const [cardLike,setCardLike]=useState(false);
    const [mainVideo, setMainVideo] = useState({});
    const previewVideos = courses.flatMap(course => (course.videos.filter(video => video.preview)));
    const handleOutsideClick = () => {
        setOpenVideo(false);
        setOpenVideoJson({})
        setMainVideo({});
    };
    useEffect(() => {
        if (!openVideoJson || Object.keys(openVideoJson).length === 0) {
            setMainVideo(previewVideos[0]);
        } else {
            const matchingVideo = previewVideos.find(video => video["guid"] === openVideoJson["guid"]);
            if (matchingVideo) {
                setMainVideo(matchingVideo);
            }
        }
    }, [openVideoJson]);

    const courseNecessaryInformation={
        guid:props.guid,
        courseImage:courseHeader.courseImage,
        courseName:courseHeader.title,
        createdName:courseHeader.instructor.name,
        price:courseHeader.price,
        discountedPrice:courseHeader.discountedPrice
    }
    const handleClickAddToCart=()=>{
        setAddToBasket(true);
        dispatch(addToBasket(courseNecessaryInformation))
    }
    const handleClickRemoveToCart=()=>{
        setAddToBasket(false);
        dispatch(removeToBasket(courseNecessaryInformation))
    }
    const handleClickFavoriteCourse=()=>{
        setCardLike(!cardLike)
    }

    return (<div className={styles.course_right_section}>
        <div className={styles.course_card}>
            <div className={styles.card_img}>
                <div className={styles.course_img}
                     onClick={() => {setOpenVideo(true)}}>
                    <LazyLoadImage src={courseHeader.courseImage}
                                   alt={courseHeader.courseImage.split("/").pop()}
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
                <h5>{courseHeader["courseDetails"]["lectures"]}</h5>
            </div>
            <div className={styles.enrol}>
                <div className={styles.icon}>
                    <MdOutlineQuiz style={{"color": "#8F85FF"}}/>
                    Quizzes
                </div>
                <h5>{courseHeader["courseDetails"]["quizzes"]}</h5>
            </div>
            <div className={styles.enrol}>
                <div className={styles.icon}>
                    <GiLevelEndFlag style={{"color": "#0FFAA4"}}/>
                    Skill level
                </div>
                <h5>{courseHeader["courseDetails"]["skillLevel"]}</h5>
            </div>
            <div className={styles.enrol}>
                <div className={styles.icon}>
                    <PiInfinity className="" style={{"color": "#FF4433"}}/>
                    Expiry period
                </div>
                <h5>{courseHeader["courseDetails"]["expiryPeriod"]}</h5>
            </div>
            <div className={styles.enrol}>
                <div className={styles.icon}>
                    <GiTrophyCup/>
                    Certificate
                </div>
                <h5>{courseHeader["courseDetails"].certificate ? "Yes" : "No"}</h5>
            </div>
            <div className={styles.card_add_remove_button}>
                {cardAddToBasket ? (
                    <div className={`${styles.btn} ${styles.btn_basket}`}
                                         onClick={handleClickRemoveToCart}>
                    <FaMinus/>
                    Remove from cart
                </div>) :
                    (<div className={`${styles.btn} ${styles.btn_basket}`}
                                        onClick={handleClickAddToCart}>
                    <FaPlus/>
                    Add to cart
                </div>)}
                <div  className={styles.btn_like} onClick={handleClickFavoriteCourse}>
                    {cardLike ? <FaHeart/> : <FaRegHeart /> }
                </div>
            </div>
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
                    <CourseReviewVideo
                        videoId={mainVideo["guid"]}
                        videoUrl={mainVideo.videoUrl}
                        videoJPG={mainVideo["videoJpg"]}
                        className={styles.video}/>
                    <h5>Free Sample Videos:</h5>

                    {previewVideos.map(video => (
                        <div className={`${styles.video_other_parent} ${mainVideo["guid"] === video["guid"] && styles.video_preview_active_row}`}
                             key={video["guid"]}
                             onClick={()=>{setMainVideo(video)}}>
                            <div className={`${styles.video_other} `}>
                                <LazyLoadImage src={video["videoJpg"]}
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
                        </div>
                    ))}

                </div>
            </OutsideClickHandler>
        </>)}
    </div>);
};

export default CourseVideo;
