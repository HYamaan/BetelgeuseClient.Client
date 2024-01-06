import React, {useEffect, useState} from 'react';
import styles from './blogs.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
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
                        className={`${categoriesActive === item[0].toLowerCase() && styles.active}`}
                        onClick={() => {
                            setCategoriesActive(item[0].toLowerCase());
                        }}
                    >
                        {item}
                    </p>
                })}
            </div>
            <div className={styles.carts}>
                {blogs.map((item) => (
                    <div key={item.id} className={styles.cart} onClick={()=>{handleClickBlogPage(item.url)}}>
                        <div className={styles.blog_grid_image}>
                            <div className={styles.blog_grid_lazy_load_image}>
                                <LazyLoadImage src={item.imageSrc}
                                               alt={item.title ? item.title.split(' ')[0] : 'FallbackAltText'} />
                            </div>
                            <p className={styles.blog_created_date}>
                                <FiCalendar />
                                <span>{item.date}</span>
                            </p>
                            <span className={styles.blog_grid_category}>{item.category[0]}</span>
                        </div>
                        <div className={styles.blog_grid_detail}>
                            <h2>{item.title}</h2>
                            <p className={styles.blog_grid_desc}>
                                {item && item.description
                                    ? item.description.length > 120
                                        ? `${item.description.slice(0, 120)}...`
                                        : item.description
                                    : 'Default Description'}
                            </p>
                            <div className={styles.blog_auth}>
                                <p>
                                    <FiUser />
                                    {item.author}
                                </p>
                                <p>
                                    <BiComment /> <span>{item.comments}</span>
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
