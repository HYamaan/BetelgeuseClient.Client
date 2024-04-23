import React, {useEffect, useState} from 'react';
import styles from './blogs.module.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {FiCalendar, FiUser} from 'react-icons/fi';
import {BiComment} from 'react-icons/bi';
import {useRouter} from "next/router";

const Blogs = ({ blogsData, categories ,blogsLength}) => {
    const router=useRouter();
    const [categoriesActive, setCategoriesActive] = useState('all');
    const [searchKey,setSearchKey]=useState('');
    const [blogs,setBlogs]=useState(blogsData);
    const handleSearchPostClick = () => {
        if (searchKey.length > 0) {
            const newData = blogs.filter(item => item.title.toLowerCase().includes(searchKey.toLowerCase()));
            setBlogs(newData);
        }
    };
    const handleClickBlogPage =  (url)=>{
        console.log("router",router.query.hasOwnProperty("category"))
        console.log("url", url);
         router.push( "blog/" + url);
    }

    useEffect(() => {
        const filteredBlogs = categoriesActive === 'all'
            ? blogsData
            : blogsData.filter(item => item.category[0].toLowerCase() === categoriesActive);

        setBlogs(filteredBlogs);
    }, [categoriesActive, blogsData]);
    useEffect(() => {
        const categoryFromRouter = router.query && router.query.category;

        if (categoryFromRouter) {
            setCategoriesActive(()=>categoryFromRouter);

            const filteredBlogs = categoryFromRouter === 'all'
                ? blogsData
                : blogsData.filter(item => item.category[0].toLowerCase() === categoryFromRouter);

            setBlogs(filteredBlogs);
        }
    }, [router.query,router.query.category, blogsData]);

    return <>
        <div className={styles.banner}>
            <LazyLoadImage
                src="/assets/image/background/blogs_cover.png"
                           className={styles.bannerImage}
            />
            <div className={styles.content}>
                <h2>Blog</h2>
                <p className={styles.posts}><span>{blogsLength}</span> Posts</p>
                <div className={styles.search_input}>
                    <input type="text" placeholder="Search for blog posts..."
                           onChange={(e) => {setSearchKey(e.target.value) }}
                    />
                    <p className={`${styles.button} button_dark`} onClick={handleSearchPostClick}>Search</p>
                </div>
            </div>
        </div>
        <section className="w-[80%] mx-auto px-[2.4rem] mt-[4rem]">
            <div className={styles.Categories}>
                <p className={`${categoriesActive === 'all' && styles.active}`}
                    onClick={() => {
                    setCategoriesActive('all');
                }}>All</p>
                {categories.map((item, index) =>{
                    return <p
                        key={index}
                        className={`${categoriesActive === item.name && styles.active}`}
                        onClick={() => {
                            setCategoriesActive(item.name);
                        }}
                    >
                        {item.name}
                    </p>
                })}
            </div>
            <div className={styles.carts}>
                {blogs.map((item) => (
                    <div key={item.id} className={styles.cart} onClick={() => {
                        handleClickBlogPage(item.id)
                    }}>
                        <div className={styles.blog_grid_image}>
                            <div className={styles.blog_grid_lazy_load_image}>
                                <LazyLoadImage src={`assets/${item.blogImage}`}
                                               alt={item.title ? item.title.split(' ')[0] : 'FallbackAltText'} />
                            </div>
                            <p className={styles.blog_created_date}>
                                <FiCalendar />
                                <span>{item.createdDate}</span>
                            </p>
                            <span className={styles.blog_grid_category}>{item.categoryName}</span>
                        </div>
                        <div className={styles.blog_grid_detail}>
                            <h2>{item.title}</h2>
                            <p className={styles.blog_grid_desc}>
                                {item && item.content
                                    ? item.content.length > 120
                                        ? `${item.content.slice(0, 120)}...`
                                        : item.content
                                    : 'Default Description'}
                            </p>
                            <div className={styles.blog_auth}>
                                <p>
                                    <FiUser />
                                    {item.authorName}
                                </p>
                                <p>
                                    <BiComment/> <span>{item.viewCount}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
};

export default Blogs;
