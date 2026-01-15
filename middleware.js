import { NextResponse } from "next/server";
export function middleware(request){
    
 const token = request.cookies.get("token");
    const {pathname}=request.nextUrl;

    if (!token && pathname.startsWith("/main")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
       if (token && (pathname.startsWith("/login" ||"/signup"))) {
        return NextResponse.redirect(new URL("/main", request.url));
    }
    
}
export const config = {
  matcher: ["/main/:path*", "/login", "/signup"],
};