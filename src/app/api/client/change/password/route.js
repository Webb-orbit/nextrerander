import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function PATCH(req) {
    const { oldpassword, newpassword } = await req.json()
    const id = await getokenid()
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }
    if (!oldpassword || !newpassword) {
        return NextResponse.json({success: false, message: "all params are required"},{status: 400})
    }
    
    const user = await User.findById(id)
    if (!user) {
        return NextResponse.json({success: false, message: "user not found"},{status: 404})
    }
    
    const comparepassword = await user.comparepass(oldpassword)
    if (!comparepassword) {
        return NextResponse.json({success: false, message: "your password is incorrect"},{status: 400})
    }

    user.password = newpassword
   const iscom = await user.save({ validateBeforeSave: false })

    if (!iscom) {
        return NextResponse.json({success: false, message: "failed to update password"},{status: 500})
    }

    return NextResponse.json({success: true, data: {},message: "your password is updated"}, {status: 200})
}