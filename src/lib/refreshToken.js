import React from 'react';
import {useCookies} from "react-cookie";
import axios from "axios";

const RefreshToken = async () => {
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

    const refreshToken = cookies.refreshToken;
    if (!refreshToken) {
        console.error('Refresh token is missing');
        return false;
    }

    try {
        const response = await axios.post(`${process.env.LOCAL_URL}/api/auth/refreshToken`, {
            refreshToken
        });

        if (!response.data || !response.data.success) {
            throw new Error('Failed to refresh token');
        }

        const {accessToken, refreshToken, accessTokenExpiration, refreshTokenExpiration} = response.data;
        setCookie("accessToken", accessToken, {
            path: '/',
            maxAge: accessTokenExpiration * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        setCookie("refreshToken", refreshToken, {
            path: '/',
            maxAge: refreshTokenExpiration * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return true;
    } catch (error) {
        console.error('Error refreshing tokens:', error);
        return false;
    }
};

export default RefreshToken;
