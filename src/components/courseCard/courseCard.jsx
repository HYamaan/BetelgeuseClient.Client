import React, {useState} from 'react';
import styles from "./courseCard.module.css"
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Image from "next/image"
import 'react-lazy-load-image-component/src/effects/blur.css';
import {FaCircle, FaClosedCaptioning, FaHeart, FaMinus, FaPlayCircle, FaPlus, FaRegClock, FaStar} from "react-icons/fa";
import Link from "next/link";
import {LuClock} from "react-icons/lu";

const xJson = {
    "s1": "Have the skills to start making money on the side, as a casual freelancer, or full time as a work-from-home freelancer",
    "s2": "Easily create a beautiful HTML & CSS website with Bootstrap (that doesn't look like generic Bootstrap websites!",
    "s3": "Sonvert any static HTML & CSS website into a Custom WordPress Theme",
    "s4": "Have a thorough understanding of utilizing PHP to create WordPress websites & themes",
    "s5": "Feel comfortable with the process of turning static websites into dynamic WordPress websites",
    "s6": "Fully understand how to use Custom Post Types and Advanced Custom Fields in WordPress"
}
const CourseCardComponent = ({popUpDirection}) => {
    const [cardHover, setCardHover] = useState(false);
    const [cardAddToBasket, setAddToBasket] = useState(false);
    const [cardLike, setCardLike] = useState(false);
    return <>
        <div className={`${styles.course_card} `}
             onMouseLeave={() => setCardHover(false)}
        >
            <div className={styles.course_card_body}
                 onMouseEnter={() => {
                     setCardHover(true)
                 }}>
                <div className={styles.course_card_image}>
                    <LazyLoadImage
                        src="assets/image/video6.jpg"
                        alt="video1.jpg"
                        effect="blur"/>
                    <div className={ `${cardLike ? styles.course_card_icon_svg : ""} ${styles.course_card_icon}`}
                    onClick={()=>{setCardLike(!cardLike)}}>
                        <FaHeart  />
                    </div>
                    <div className={styles.course_card_image_text}>
                        <h3>Intermediate</h3>
                    </div>
                </div>
                <div className={styles.course_card_text}>
                    <h5>WordPress Theme Development with Bootstrap</h5>
                    <div className={styles.review_icon}>
                        <div className={styles.review_icon_star}>
                            <p>4</p>
                            <FaStar/>
                            <p>(2 Reviews)</p>
                        </div>
                        <div className={styles.review_btn}>
                    <span>
                         <Image
                             src="/assets/image/compare.png"
                             alt="video1.jpg"
                             width={1}
                             height={1}
                         />
                    Compare
                    </span>
                        </div>
                    </div>
                    <div className={styles.ellipsis_line}>
                        Learn how to confidently develop custom & profitable Responsive WordPress Themes and Websites
                        with no prior experience.
                    </div>
                    <div className={styles.courses_price_border}>
                        <div className={styles.courses_price}>
                            <div className={styles.courses_price_left}>
                                <h5>$10</h5>
                                <p>
                                    <del>$11.99</del>
                                </p>
                            </div>
                            <div className={styles.courses_price_right}>
                                <FaRegClock/>
                                24:11:44 Hours
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {cardHover && (<div className={`
                    ${styles.webui_popover}
                     ${popUpDirection === "right" ? styles.webui_popover_right : styles.webui_popover_left}
                     ${styles.webui_popover_active}`}
            >
                <div className={`${styles.arrow} 
                        ${popUpDirection === "right" ? styles.arrow_left : styles.arrow_right}`}>
                </div>
                <div className={styles.webui_popover_inner}>
                    <div className={styles.web_popover_content}>
                        <p className={styles.course_last_update}>Last updated Wed, 04-Oct-2023</p>
                        <Link href="#" className={styles.course_title}>WordPress Theme Development with
                            Bootstrap</Link>
                        <div className={styles.course_meta}>
                            <span>
                                <FaPlayCircle/>
                                25 Lessons
                            </span>
                            <span>
                                <LuClock/>
                                01:15:34 Hours
                            </span>
                            <span>
                                <FaClosedCaptioning/>
                                English
                            </span>
                        </div>
                        <div className={styles.course_subtitle}>
                            Learn Adobe Illustrator CC graphic design, logo design, and more with this in-depth,
                            practical, easy-to-follow course!
                        </div>
                        <h6 className={styles.course_outcomes_text}>Outcomes:</h6>
                        <div className={styles.will_learn_section}>
                            {Object.entries(xJson).slice(0, 3).map(([key, value]) => (
                                <div key={key} className={styles.will_learn}>
                                    <FaCircle/>
                                    <div>{value}</div>
                                </div>))}
                        </div>
                        <div className={styles.popover_buttons}>
                            {cardAddToBasket ? (<div className={styles.purchase_btn} onClick={() => {
                                setAddToBasket(false)
                            }}>
                                <FaMinus/>
                                Remove from cart
                            </div>) : (<div className={styles.purchase_btn}
                                            onClick={() => {
                                                setAddToBasket(true)
                                            }}>
                                <FaPlus/>
                                Add to cart
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>)}
        </div>

    </>
};

export default CourseCardComponent;
