import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req){

    // console.log(req.nextUrl.pathname, 'checking');

    let token = undefined;
    const path =  req.nextUrl.pathname;

    const secret = process.env.NEXTAUTH_SECRET;

    if(req.cookies.has("next-auth.session-token"))
    {
        token = req.cookies.get("next-auth.session-token");
    }
    else if(req.header.get("Authorization")?.startsWith("Bearer "))
    {
        token = req.header.get("Authorization")?.subString("7");
    }

    //protecting only dashboard for now
    if(!token)
    {
        return NextResponse.redirect(new URL("/", req.url));
    }


    // console.log(token.value);
    // const token = await getToken({req, secret});

    // if(!token)
    // {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }
    
    // console.log(token);

    // if(path === "/")
    // {
    //     return NextResponse.next();
    // }

    // if(!session && path === "/dashboard")
    // {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
    // else if(session && (path === "/login" || path === "/register"))
    // {
    //     return NextResponse.redirect(new URL("/protected", req.url));
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*'
}