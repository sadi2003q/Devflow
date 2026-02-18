
// proxy.ts
import {NextResponse, NextRequest} from 'next/server'
import { verifyAuthToken } from "@/lib/auth";




function authMiddleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value ?? "";

    const publicRoutes = ['/', '/signin', '/signup'];
    const isPublicRoute = publicRoutes.includes(path);

    if (token) {
        try {
            verifyAuthToken(token);
        } catch {
            const response = NextResponse.redirect(
                new URL(isPublicRoute ? '/' : '/signin', request.nextUrl)
            );
            response.cookies.set("token", "", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 0,
            });
            return response;
        }
    }

    // 🚫 Not logged in → block private routes
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl));
    }

    // 🚫 Logged in → block public routes
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    return NextResponse.next();
}


// Logging middleware
function loggingMiddleware(request: NextRequest) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname}`);
    return NextResponse.next();
}


export function proxy(request: NextRequest) {
    loggingMiddleware(request);
    return authMiddleware(request);
}


export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/dashboard/:path*',
        '/admin/:path*',
        '/signin',
        '/signup'
    ]
}
