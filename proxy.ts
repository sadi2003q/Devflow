
// proxy.ts
import {NextResponse, NextRequest} from 'next/server'


export function apiAuthMiddleware(req: NextRequest) {
    const token = req.cookies.get("auth")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // you can also add role-based logic here
    return NextResponse.next();
}


function authMiddleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("auth")?.value;

    const publicRoutes = ['/', '/signin', '/signup'];
    const isPublicRoute = publicRoutes.includes(path);


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