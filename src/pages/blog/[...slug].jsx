import React from 'react';
import BlogDetail from "@/components/Blog/BlogDetail/BlogDetail";
import {fetchBlogDetail} from "@/lib/fetch";

const BlogDetailPage = ({blogDetail}) => {
    return <BlogDetail  blogDetail={blogDetail}/>

};

export default BlogDetailPage;
export async function getServerSideProps({params}) {
    const url =params.slug[0];
    const blogDetail=await fetchBlogDetail(url);
    if(blogDetail){
        return{
            props:{blogDetail}
        }
    }else{
        console.error(`Course not found for guid: ${url}`);
        return {
            notFound: true,
        };
    }

}
