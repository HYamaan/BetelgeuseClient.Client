import React from 'react';
import Blogs from "@/components/Blog/Blogs/Blogs";
import {fetchBlogs, fetchBlogsCategory} from "@/lib/fetch";

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
    const blogsData = await fetchBlogs();
    const categories =  await fetchBlogsCategory();
    const blogsLength = blogsData.length;
    return {
        props: {
            blogsData,
            categories,
            blogsLength
        },
    };
}
