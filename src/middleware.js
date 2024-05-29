import {NextResponse} from 'next/server';


export async function middleware(request) {
    const url = request.nextUrl.clone(); // Mevcut URL'i klonla
    var response = NextResponse.next();

    const refreshToken = getCookie(request, 'refreshToken');
    const accessToken = getCookie(request, 'accessToken');

    const decodedAccessToken = decodeJwt(accessToken);

    if (!refreshToken && !accessToken) {
        if (url.pathname !== '/auth/login') {
            url.href = `${process.env.LOCAL_URL}/auth/login`;
            return NextResponse.redirect(url);
        }
        return response;
    }

    if (decodedAccessToken && url.pathname !== '/auth/login') {
        return NextResponse.next();
    }
    console.log("refreshToken: ", refreshToken);
    console.log("accessToken: ", accessToken);
    const validationResponse = await validateRefreshToken(refreshToken);
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
    console.log("BURADA")
    if (url.pathname === '/panel') {
        console.log("BURADA;;;;;;;;;;;;;;;")
        url.pathname = '/panel/dashboard';
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith('/panel')) {
        setCookies(response, validationResponse);
        return response;
    }


    return response;
}

function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1]; // Token'ın payload bölümünü al
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
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
    matcher: ['/auth/login', '/panel'] // Middleware'in hangi yollar için çalışacağını belirle
};
