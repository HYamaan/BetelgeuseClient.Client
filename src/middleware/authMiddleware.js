import {NextResponse} from 'next/server';

export default async function AuthMiddleware(request) {
    const url = request.nextUrl.clone(); // Mevcut URL'i klonla
    console.log("Middleware çalıştı.")
    return nextResponse.next({
        request: {
            headers: "Middleware çalıştı."
        }
    })
}
