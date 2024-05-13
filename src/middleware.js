import {NextResponse} from 'next/server';
import * as cookie from "cookie";

export async function middleware(request) {
    const url = request.nextUrl.clone(); // Mevcut URL'i klonla
    var response = NextResponse.next();

    const refreshToken = getCookie(request, 'refreshToken');
    const accessToken = getCookie(request, 'accessToken');
    if (!refreshToken) {
        if (url.pathname !== '/auth/login') {
            url.href = `${process.env.LOCAL_URL}/auth/login`;
            return NextResponse.redirect(url);
        }
        return response;
    }

    const validationResponse = await validateRefreshToken(refreshToken);
    console.log("validationResponse", validationResponse)
    if (!validationResponse || !validationResponse.success) {
        clearTokens(response);
        url.href = `${process.env.LOCAL_URL}/auth/login`;
        return response;
    }

    if (url.pathname === '/auth/login') {
        url.href = `${process.env.LOCAL_URL}/panel/dashboard`;
        const res = NextResponse.redirect(url);
        setCookies(res, validationResponse);
        return res;
    }

    if (url.pathname === '/panel/dashboard') {
        url.href = `${process.env.LOCAL_URL}/panel/dashboard`;
        const res = NextResponse.rewrite(url);
        setCookies(res, validationResponse);
        return res;
    }

    return response;

}

function setCookies(res, validationResponse) {
    res.cookies.set("accessToken", validationResponse.accessToken, {
        path: '/',
        maxAge: validationResponse.accessTokenExpiration,
        secure: process.env.NODE_ENV === 'production',  // Üretimde güvenli
        sameSite: 'Strict'
    });
    res.cookies.set("refreshToken", validationResponse.refreshToken, {
        path: '/',
        maxAge: validationResponse.refreshTokenExpiration,
        secure: process.env.NODE_ENV === 'production',  // Üretimde güvenli
        sameSite: 'Strict'
    });
}

function clearTokens(response) {
    // accessToken ve refreshToken çerezlerini temizle
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
}
function getCookie(request, name) {
    const cookie = request.cookies.get(name)?.value;
    return cookie || '';
}

async function validateRefreshToken(token) {
    try {
        const response = await fetch(`${process.env.LOCAL_URL}/api/auth/refreshToken`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken: token})
        });
        if (!response.ok) {
            return {success: false};
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error validating refresh token:', error);
        return false;
    }
}

export const config = {
    matcher: ['/auth/login', '/panel/dashboard'] // Middleware'in hangi yollar için çalışacağını belirle
};
