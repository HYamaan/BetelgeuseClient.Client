import axios from "axios";

export const fetchFooter = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/footer`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchCourses = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/courses`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchBookCategories = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/bookCategories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchMostPopularCategories = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/mostPopularCategories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPromotion = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/promotion`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchBlogs= async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/blogs`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchBlogsCategory = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/blogs`);
        const data = response.data;
        return [...new Set(data.map(entry => entry.category))];
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchBlogDetail= async (url) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/blogsDetail`);
        return response.data.filter(item=>item.url === url);
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
