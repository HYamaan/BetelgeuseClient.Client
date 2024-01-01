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
