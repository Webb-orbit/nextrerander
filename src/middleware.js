import { NextResponse } from "next/server";


export function middleware(req) {
    console.log("middelware", req.nextUrl.pathname);
}

export const config = {
    matcher: ['/'],
}