import React from 'react';
import Blogs from "@/components/Blog/Blogs/Blogs";
import axios from "axios";

const Blog = ({blogsData, categories,blogsLength}) => {
    return <>
        <Blogs
            blogsData={blogsData}
            categories={categories}
            blogsLength={blogsLength}
        />
    </>
};
export default Blog;

export async function getServerSideProps(req, res) {
    let blogsData, categories, blogsLength;
    const blogsCategories = await axios.get(`${process.env.LOCAL_URL}/api/blog/allCategories`);
    if (req.query.hasOwnProperty("category")) {
        const category = req.query.category;
        const blogs = await axios.get(`${process.env.API_SERVER}/Blog/GetBlogByCategories?CategoryId=${category}`)
        console.log("blogs", blogs.data.data)
        blogsData = blogs.data.data;
    } else {
        const blogs = await axios.get(`${process.env.LOCAL_URL}/api/blog/allBlogs`)
        if (blogs.status !== 200 || blogsCategories.status !== 200) {
            return {
                redirect: {
                    destination: '/blog', // Redirect to the 404 page
                    permanent: false,
                }
            };
        }
        blogsData = blogs.data.data;
    }
    categories = blogsCategories.data.data;
    if (blogsData === null) {
        blogsLength = 0
    } else {
        blogsLength = blogsData.length
    }
    return {
        props: {
            blogsData,
            categories,
            blogsLength
        },
    };
}
