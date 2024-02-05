// src/middleware/authMiddleware.js
import {NextResponse} from 'next/server';

export function middleware(request) {
    if (!userIsAuthenticated(request)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

function userIsAuthenticated(request) {
    // Kullanıcının girişi yapıldığını kontrol etmek için kullanılacak mantık
    // Örneğin, request.headers.authorization içinde bir token kontrolü
    const authToken = request.headers.authorization;

    return Boolean(authToken);
}

export const config = {
    matcher: '/login',
};
