import {NextResponse} from 'next/server';

export async function middleware(request) {
    const url = request.nextUrl.clone(); // Mevcut URL'i klonla
    if (url.pathname === '/auth/login') {
        const refreshToken = getCookie(request, 'refreshToken');
        if (refreshToken) {
            const isValid = await validateRefreshToken(refreshToken);
            if (isValid) {
                console.log("Token geçerli");
                // Token geçerli, kullanıcıyı anasayfaya yönlendir
                url.pathname = '/panel';
                return NextResponse.redirect(url);
            }
        }
    }
    if (url.pathname === '/panel') {
        const refreshToken = getCookie(request, 'refreshToken');
        if (!refreshToken) {
            url.pathname = '/auth/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

function getCookie(request, name) {
    const cookie = request.cookies.get(name)?.value;
    return cookie || '';
}

async function validateRefreshToken(token) {
    try {
        const response = await fetch(`${process.env.API_SERVER}/Auth/refresh-token-login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken: token})
        });
        if (response.ok) {
            const data = await response.json();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error validating refresh token:', error);
        return false;
    }
}

export const config = {
    matcher: ['/auth/login', '/panel'] // Middleware'in hangi yollar için çalışacağını belirle
};
