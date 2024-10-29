import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {tag} = await request.json()
    revalidateTag(tag)
    return NextResponse.json({success: true,data:{tag} ,message:"your revalidate"}, {status: 200})
}