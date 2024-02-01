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
export const fetchPanelNavigation = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/userPanelNavigation`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelPurchasesCourse = async (startIndex, endIndex) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/purchasesCourse`);
        const allData = response.data;

        const slicedData = startIndex !== undefined && endIndex !== undefined
            ? allData.slice(startIndex, endIndex)
            : allData;

        return {
            data: slicedData,
            length: allData.length,
        };
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelFavoritesCourse = async (startIndex, endIndex) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/favoritesCourse`);
        const allData = response.data;

        const slicedData = startIndex !== undefined && endIndex !== undefined
            ? allData.slice(startIndex, endIndex)
            : allData;

        return {
            data: slicedData,
            length: allData.length,
        };
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelCommentsCourse = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelComments`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelFollowingCourse = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/followingCourse`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelAssignments = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelAssignments`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelMeetingsInstructor = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelMeetingsInstructor`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelAchievements = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelAchievements`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelCompletionCertificates = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/CompletionCertificates`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelStorePurchases = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelStoreMyPurchases`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelFinancialSummary = async (startIndex, endIndex) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER}/panelFinancialSummary`);
        const allData = response.data;

        const slicedData = startIndex !== undefined && endIndex !== undefined
            ? allData.slice(startIndex, endIndex)
            : allData;

        return {
            data: slicedData,
            length: allData.length,
        };
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
