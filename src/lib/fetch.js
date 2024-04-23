import axios from "axios";

export const fetchFooter = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/footer`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchCourses = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/courses`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchBookCategories = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/bookCategories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchMostPopularCategories = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/mostPopularCategories`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPromotion = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/promotion`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchBlogs= async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/blogs`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchBlogsCategory = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/blogs`);
        const data = response.data;
        return [...new Set(data.map(entry => entry.category))];
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};

export const fetchBlogDetail= async (url) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/blogsDetail`);
        return response.data.filter(item=>item.url === url);
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelNavigation = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/userPanelNavigation`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelPurchasesCourse = async (startIndex, endIndex) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/purchasesCourse`);
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
        const response = await axios.get(`${process.env.API_SERVER1}/favoritesCourse`);
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
        const response = await axios.get(`${process.env.API_SERVER1}/panelComments`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelFollowingCourse = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/followingCourse`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelAssignments = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/panelAssignments`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelMeetingsInstructor = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/panelMeetingsInstructor`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelAchievements = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/panelAchievements`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelCompletionCertificates = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/CompletionCertificates`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelStorePurchases = async () => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/panelStoreMyPurchases`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching courses');
    }
};
export const fetchPanelFinancialSummary = async (startIndex, endIndex) => {
    try {
        const response = await axios.get(`${process.env.API_SERVER1}/panelFinancialSummary`);
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
