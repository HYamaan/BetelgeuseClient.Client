import React, {useState} from 'react';
import styles from './BlogDetail.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {useFormik} from "formik";
import {BlogDetailCommentSchema} from "@/schema/BlogDetailCommentSchema";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {OutsideClickHandler} from "@/hooks/boxOutSideClick";
import Banner from "@/components/Blog/Banner/Banner";
import {useRouter} from "next/router";

const BlogDetail = ({blogDetail}) => {
    const router =useRouter();
    const [dotInformationPopup,setDotInformationPopup]=useState(false);

    const handleOutsideClick = () => {
        setDotInformationPopup(false);
    };
    const handleClickAllPosts =()=>{
        router.push('/'+ router.asPath.split('/')[1])
    }
    const handleClickCategoriesPosts = (categoryUrl) => {
        const url =categoryUrl.toLowerCase();
        const currentPath = router.asPath.split('/');
        const basePath = currentPath[1];
        const newUrl = `/${basePath}?category=${url}`;
        router.push(newUrl);
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

    return<>
        <Banner
            date={blogDetail.createdDate}
            author={blogDetail.author.userName}
            title={blogDetail.title}
            category={blogDetail.blogCategory.name}
            handleClickCategoriesPosts={handleClickCategoriesPosts}
        />
        <section className="w-[80%] mx-auto px-[2.4rem] mt-[4rem]">
            <div className={styles.blogSection}>
                <div className={styles.blogContainer} >
                    <div className={styles.blogPost}>
                        {blogDetail[0].blogPost.map((item, index) => {
                            const itemKey = Object.keys(item)[0];
                            const ItemComponent = itemKey || 'div';

                            if (item.src) {
                                return (
                                    <LazyLoadImage
                                        key={index}
                                        src={item.src}
                                        className={styles.blogDetailImage}
                                    />
                                );
                            } else if (item[itemKey]) {
                                return <ItemComponent key={index}>{item[itemKey]}</ItemComponent>;
                            } else {
                                return null;
                            }
                        })}
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
                        {
                            blogDetail[0].comments.map((item,index)=>(
                                <div className={`${styles.box} my-5`} key={index}>
                                    <div className={styles.comment_user_info}>
                                        <div className={styles.comment_user}>
                                            <Avatar
                                                src={item.userImageSrc}
                                                alt="demo Onstructor"
                                                sx={{bgcolor: deepPurple.A700}}
                                            />
                                            <div className={styles.comment_user_description}>
                                                <p className={styles.comment_user_name}>{item.userName}</p>
                                                <p className={styles.comment_user_degree}>{item.userDegree}</p>
                                            </div>
                                        </div>
                                        <div className={styles.comment_date}>
                                            <div >
                                                <span>{item.commentDate.date}</span> | <span>{item.commentDate.time}</span>
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
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                    <div className={styles.user_comment}>{item.commentText}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.infoSection}>
                    <div className={`${styles.instructor} ${styles.box}`}>
                        <Avatar
                            src={blogDetail[0].authorImage}
                            alt={blogDetail[0].title.split(" ")[0]}
                            sx={{bgcolor: deepPurple.A700}}
                        />
                        <div className={styles.instructor_title}>{blogDetail[0].author}</div>
                        <div className={styles.instructor_subTitle}>Author</div>
                        <div className="button_dark w-full text-center mt-4">Author Posts</div>
                    </div>
                    <div className={`${styles.box} ${styles.categories}`}>
                        <h2>Categories</h2>
                        {
                            blogDetail[0].category.map((item,index)=>(<p key={index} onClick={()=>{handleClickCategoriesPosts(item)}}>{item}</p>))
                        }
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
                        <div className={`button_dark mt-5`} onClick={handleClickAllPosts}>View All Posts</div>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default BlogDetail;


