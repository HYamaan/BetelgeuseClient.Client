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

export async function getServerSideProps() {
    const blogs = await axios.get(`${process.env.LOCAL_URL}/api/blog/allBlogs`)
    const blogsCategories = await axios.get(`${process.env.LOCAL_URL}/api/blog/allCategories`);
    if (blogs.status !== 200 || blogsCategories.status !== 200) {
        return {
            notFound: true,
        }
    }
    console.log("categories", blogsCategories.data.data)
    const blogsData = blogs.data.data;
    const categories = blogsCategories.data.data;
    const blogsLength = blogsData.length;
    console.log("blogsData", blogsData);
    return {
        props: {
            blogsData,
            categories,
            blogsLength
        },
    };
}
