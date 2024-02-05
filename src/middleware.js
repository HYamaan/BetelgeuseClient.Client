import {NextResponse} from 'next/server'
import {isAuth} from './lib/auth'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const allCookies = request.cookies.getAll();
    if (isAuth(request.cookies)) {
        return NextResponse.redirect(new URL('/panel', request.url));
    }

    // const requestHeaders = new Headers(request.headers);
    // if(!requestHeaders.get('user-agent').includes('bot')) {
    //     return NextResponse.rewrite('/robots.txt',request.url);
    // }
    // const response= NextResponse.next({
    //     request:{
    //         headers:requestHeaders
    //     },
    // });
    // console.log("response",response)
    // return response;
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/auth/login'
}
