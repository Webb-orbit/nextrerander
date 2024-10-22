import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function GET() {
    const id = getokenid();
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }

    const getkay = await User.findById(id).select("apikey")

    if (!getkay) {
        return NextResponse.json({success: false, message: "your api key not found"},{status: 500})
    }

    return NextResponse.json({success: true, data: {...getkay._doc}, message: "apikey"}, {status: 200})
}