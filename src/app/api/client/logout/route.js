import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";
import { cookies } from "next/headers";

await connectdb()

export async function GET() {
    const id = getokenid()
    if (!id) {
        return NextResponse.json({success: false,message: "token is not found"},{status: 400})
    }

    const isok = await User.findByIdAndUpdate(id, {
        $unset:{
            refreshtokan: 1
        }
    }, {new: true})

    if (!isok) {
        return NextResponse.json({success: false,message: "server error"},{status: 500})
    }

    cookies().delete('accesstoken')
    cookies().delete('refreshtoken')

    return NextResponse.json({
        success: true,
        data: {},
        message: "you are log out"
    },{status: 200})
}