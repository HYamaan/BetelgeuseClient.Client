import React from 'react';
import BlogDetail from "@/components/Blog/BlogDetail/BlogDetail";
import axios from "axios";

const BlogDetailPage = ({blogDetail}) => {
    return <BlogDetail  blogDetail={blogDetail}/>

};

export default BlogDetailPage;
export async function getServerSideProps({params}) {
    const url =params.slug[0];
    const blog = await axios.get(`${process.env.LOCAL_URL}/api/blog/getBlogById?Id=${url}`);
    if (blog.status !== 200) {
        return {
            notFound: true
        }
    }
    const blogDetail = blog.data.data;
    console.log("blogDetail", blogDetail);
    if(blogDetail){
        return{
            props:{blogDetail}
        }
    }

}
