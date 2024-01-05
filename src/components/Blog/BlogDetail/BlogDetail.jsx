import React, {useState} from 'react';
import styles from './BlogDetail.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {useFormik} from "formik";
import {BlogDetailCommentSchema} from "@/schema/BlogDetailCommentSchema";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
const BlogDetail = () => {
    const [dotInformationPopup,setDotInformationPopup]=useState(false);

    const handleOutsideClick = () => {
        setDotInformationPopup(false);
    };
    const onSubmit = async (values, actions) => {
        console.log("values",values)
        console.log("actions",actions)
    }
    const BlogDetailComment = useFormik({
        initialValues: {
            textarea: ""
        },
        onSubmit,
        validationSchema: BlogDetailCommentSchema,
    });
    return <div className={styles.blogSection}>
        <div className={styles.blogContainer} >
            <div className={styles.blogPost}>
                <LazyLoadImage
                    src="/assets/image/background/blog-detail.png"
                    className={styles.blogDetailImage}
                />
                your notes or assignments when you needed them? You probably ended up wasting precious time looking for them, be<p>A strong academic record can open doors for you down the road. More importantly, through the process of becoming a straight-A student, you’ll learn values like hard work, discipline and determination.</p>
                <h2>Exploring Generative AI in Content Creation</h2>
                <p>If you choose to use a digital calendar, I recommend Google Calendar.</p>
                <p>(b) Schedule a fixed time every week where you review your upcoming events over the next two months. Mark down when you’ll start preparing for that Math exam, working on that History project, or writing that English paper.</p>
                <p>(d) Next, note your commitments for the coming week, e.g. extracurricular activities, family gatherings, extra classes. On your calendar, highlight the blocks of time you’ll have for schoolwork.</p>
                <p>This planning process might sound time-consuming, but it’ll typically take just 15 minutes every week.</p>
                <p>This is a wise investment of time as a student, because the rest of your week will become far more productive.</p>
                <p>This way, you’ll be studying smart, not just hard!</p>
                <h2>Rule #2: Be organized.</h2>
                <p>Ever had trouble finding fore you finally asked to borrow them from your friend.</p>

                <p>Many students tell me that they keep all their notes and assignments in one big pile, and only sort them out before their exams!</p>

                <p>Being organized – it’s easier said than done, I know.</p>
            </div>
            <div className={styles.blogComments}>
                <h4 className={styles.blogComments_title}>Comments<span>(1)</span></h4>
                <form onSubmit={BlogDetailComment.handleSubmit} >
                    <textarea
                        name="textarea"
                        value={BlogDetailComment.values.textarea}
                        onChange={BlogDetailComment.handleChange}
                        onBlur={BlogDetailComment.handleBlur}
                        className={styles.form_control}
                    />
                    <input type="submit" value="Post comment"  className={styles.button_dark}/>
                </form>
                <div className={`${styles.box} my-5`}>
                    <div className={styles.comment_user_info}>
                        <div className={styles.comment_user}>
                            <Avatar
                                src="/assets/image/instructor/demo_instructor.jpg"
                                alt="demo Onstructor"
                                sx={{bgcolor: deepPurple.A700}}
                            />
                            <div className={styles.comment_user_description}>
                                <p className={styles.comment_user_name}>Robert Ransdell</p>
                                <p className={styles.comment_user_degree}>User</p>
                            </div>
                        </div>
                        <div className={styles.comment_date}>
                            <div >
                                <span>4 Mar 2022</span> | <span>12:07</span>
                            </div>
                            <HiOutlineDotsVertical onClick={()=>{setDotInformationPopup(!dotInformationPopup)}}/>

                            <div  className={`${styles.dotInformationPopup} ${dotInformationPopup ? styles.visible : ''}`}>
                                {dotInformationPopup && (
                                    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
                                        <div className={styles.dot_info}>
                                            <p>Reply</p>
                                            <p>Report</p>
                                        </div>
                                    </OutsideClickHandler>
                                )
                                }

                            </div>

                        </div>
                    </div>
                    <div className={styles.user_comment}>
                        Thank you for this excellent article. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad adipisci autem deserunt dolorem in ipsum itaque iure officiis possimus, quae quaerat quod repudiandae. Esse excepturi hic nemo tenetur totam?
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.infoSection}>
            <div className={`${styles.instructor} ${styles.box}`}>
                <Avatar
                    src="/assets/image/instructor/demo_instructor.jpg"
                    alt="demo Onstructor"
                    sx={{bgcolor: deepPurple.A700}}
                />
                <div className={styles.instructor_title}>George Hamilton</div>
                <div className={styles.instructor_subTitle}>Author</div>
                <div className="button_dark w-full text-center mt-4">Author Posts</div>
            </div>
            <div className={`${styles.box} ${styles.categories}`}>
                <h2>Categories</h2>
                <p>Announcements</p>
                <p>Articles</p>
                <p>Events</p>
                <p>News</p>
            </div>
            <div className={`${styles.box} ${styles.recentPost}`}>
                <h2>Recent posts</h2>
                <div className={styles.otherBlogDetail}>
                    <div className={styles.otherBlogDetailImageParent}>
                        <LazyLoadImage
                            src="/assets/image/background/blog-detail.png"
                            className={styles.otherBlogDetailImage}
                        />
                    </div>
                    <div className={styles.otherBlogDetailDescription}>
                        <p>How to Teach Your Kid Easily</p>
                        <p>30 Jun 2021</p>
                    </div>
                </div>
                <div className={styles.otherBlogDetail}>
                    <div className={styles.otherBlogDetailImageParent}>
                        <LazyLoadImage
                            src="/assets/image/background/blog-detail.png"
                            className={styles.otherBlogDetailImage}
                        />
                    </div>
                    <div className={styles.otherBlogDetailDescription}>
                        <p>How to Teach Your Kid Easily</p>
                        <p>30 Jun 2021</p>
                    </div>
                </div>
                <div className={`button_dark mt-5`}>View All Posts</div>
            </div>
        </div>
    </div>

};

export default BlogDetail;
