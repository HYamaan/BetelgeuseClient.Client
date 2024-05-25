// utils/auth.js
import axios from 'axios';
import Cookies from 'js-cookie';

const removeCookies = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    alert('Your session has expired. Please log in again.')
    window.location.href = '/auth/login';
}

export async function refreshToken() {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
        console.error('Refresh token is missing');
        window.location.href = '/auth/login';

        return false;
    }

    try {
        const response = await axios.post(`${process.env.LOCAL_URL}/api/auth/refreshToken`, {
            refreshToken
        });
        console.log("response", response);
        if (!response.data || !response.data.success) {

            throw new Error('Failed to refresh token');
        }

        const {
            accessToken,
            refreshToken: newRefreshToken,
            accessTokenExpiration,
            refreshTokenExpiration
        } = response.data;

        console.log("response.data", response.data);

        Cookies.set('accessToken', accessToken, {
            path: '/',
            expires: accessTokenExpiration, // expiration time in seconds
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        Cookies.set('refreshToken', newRefreshToken, {
            path: '/',
            expires: refreshTokenExpiration, // expiration time in seconds
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return true;
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        removeCookies();
        return false;
    }


}
