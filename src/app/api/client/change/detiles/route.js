import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function PATCH(req) {
    const { email, username } = await req.json()
    const id = await getokenid()
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }
    if (!email && !username) {
        return NextResponse.json({success: false, message: "email, username one of them are required"},{status: 400})
    }

    const updateduser = await User.findByIdAndUpdate(id, {
        $set: {
            email,
            username,
        }
    }, { new: true }).select("-password -refreshtokan")

    if (!updateduser) {
        return NextResponse.json({success: false, message: "failed to update you infos"},{status: 500})
    }

   return NextResponse.json({success: true, data: { ...updateduser._doc }, message: "user is updated"},{status: 200})
}


