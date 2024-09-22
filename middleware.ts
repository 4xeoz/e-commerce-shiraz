import { auth } from './auth/auth';
import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
    const session = await auth();

    // Check if the requested path is under /admin
    const isProtected = req.nextUrl.pathname.startsWith("/admin");
    console.log("isProtected.....................................", isProtected);

    if (isProtected && !session) {
        const absoluteUrl = new URL("/", req.nextUrl.origin).toString();
        return NextResponse.redirect(absoluteUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // Matches all paths except API, static files, etc.
        "/admin/:path*", // Ensures that all /admin paths are matched
    ],
};
