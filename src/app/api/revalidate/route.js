"use server"
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { cacheTag } from 'next/cache';

export async function POST(request) {
    "use cache"
    const {tag} = await request.json()
    cacheTag(tag)
    revalidateTag(tag)
    return NextResponse.json({success: true,data:{tag} ,message:"your revalidate"}, {status: 200})
}