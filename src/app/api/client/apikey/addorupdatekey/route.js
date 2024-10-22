import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function PATCH(req) {
    const { apikey } = await req.json()
    const id = getokenid()
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }
    if (!apikey) {
        return NextResponse.json({success: false, message: "not dound any api key"},{status: 400})
    }

    const addkey = await User.findByIdAndUpdate(id,{
        $set:{
            apikey
        }
    }, {new: true}).select("apikey")

    if (!addkey) {
        return NextResponse.json({success: false, message: "failed to add api key"},{status: 500})
    }

    return NextResponse.json({success: true, data:{...addkey._doc}, message: "your key added successfully" }, {status: 200})
}