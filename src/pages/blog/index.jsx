import React from 'react';
import Banner from "@/components/Blog/Banner/Banner";
import BlogDetail from "@/components/Blog/BlogDetail/BlogDetail";

const Blog = () => {
    return<>
        <Banner/>
        <div className="w-[80%] mx-auto px-[2.4rem] mt-[4rem]">
            <BlogDetail/>
        </div>
    </>
};

export default Blog;
