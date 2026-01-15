import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("token"); // Fixed: use 'request' not 'req'
    const { pathname } = request.nextUrl;

    // Check if user is NOT authenticated and trying to access protected routes
    if (!token && (pathname.startsWith("/main") || pathname.startsWith("/quiz"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Check if user IS authenticated and trying to access auth pages
    if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/main", request.url));
    }
}

export const config = {
    matcher: ["/main/:path*", "/quiz/:path*", "/login", "/signup"],
}
