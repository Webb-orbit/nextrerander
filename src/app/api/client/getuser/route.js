import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function GET() {
    const id = await getokenid();
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }

    const getuser = await User.findById(id).select("-apikey")

    if (!getuser) {
        return NextResponse.json({success: false, message: "i cant found you"},{status: 500})
    }

    return NextResponse.json({success: true, data: {...getuser._doc}, message: "    yo! "}, {status: 200})
}