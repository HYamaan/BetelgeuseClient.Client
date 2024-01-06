import React, {useState} from 'react';
import styles from "./banner.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {FaShareAlt} from "react-icons/fa";
import {GrShareOption} from "react-icons/gr";
import {useRouter} from "next/router";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton
} from "react-share";

const Banner = ({date,author,title,category,handleClickCategoriesPosts}) => {
    const [openPopUp, setOpenPopUp] = useState(false)

    const share = useRouter();
    const base = process.env.LOCAL_URL;
    const links = base + share.asPath;
    const copylink = () => {
        navigator.clipboard.writeText(links)
    }


    return <div className={styles.bannerSection}>
        <div className={styles.banner}>
            <LazyLoadImage
                src={"/assets/image/course-breadcramb.png"}
                className={styles.banner_image}
                alt="circle"
            />
            <div className={styles.titleSection}>
                <h1>{title}</h1>
                <div className={styles.title_description}>
                    <p>Created by <span>{author}</span></p>
                    <p>in <span onClick={()=>{handleClickCategoriesPosts(category)}}>{category}</span></p>
                    <p>{date}</p>
                    <p className={styles.share} onClick={() => {
                        setOpenPopUp(true)
                    }}>
                        <FaShareAlt/>
                        <span>Share</span>
                    </p>
                </div>
            </div>
            <div className={`${openPopUp ? styles.SharePopup_open : ''}`}>
                {openPopUp && (
                    <div className={styles.Share_popup_content}>
                        <h3 className={styles.popup_title}>Share</h3>
                        <div className={styles.popup_share_icon}>
                            <GrShareOption/>
                            <p>Share this post with others</p>
                        </div>
                        <div className={styles.url}>
                            <p className={styles.copy_url}>{links.length > 44 ? links.slice(0, 44) + '...' : links}</p>
                            <p className={styles.copy_button} onClick={copylink}>Copy</p>
                        </div>
                        <div className={styles.SocialMedia}>

                                <FacebookShareButton url={links} quote="please sheare this post" hashtag="#code">
                                    <p>
                                        <i className="fab fa-facebook-f icon"></i>
                                    </p>
                                </FacebookShareButton>

                                <TwitterShareButton url={links} quote="please sheare this post" hashtag="#code">
                                    <p><i className="fab fa-twitter icon"></i></p>
                                </TwitterShareButton>

                                <LinkedinShareButton url={links} quote="please sheare this post" hashtag="#code">
                                    <p><i className="fab fa-linkedin-in icon"></i></p>
                                </LinkedinShareButton>

                                <RedditShareButton url={links} quote="please sheare this post" hashtag="#code">
                                <p>
                                    <i className="fa-brands fa-reddit icon"></i>
                                </p>
                                </RedditShareButton>

                        </div>
                        <div className={`${styles.buttonClose} button_close`} onClick={() => {
                            setOpenPopUp(false)
                        }}>Close
                        </div>
                    </div>
                )}
            </div>
        </div>

    </div>
};

export default Banner;
