import React from 'react';
import styles from "@/pages/course/course.module.css";
import {Avatar, Rating} from "@mui/material";
import {deepPurple} from "@mui/material/colors";

const UserReviewInfo = (props) => {
    const {reviewsValue}=props;
    return <>
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
    </>
};

export default UserReviewInfo;
