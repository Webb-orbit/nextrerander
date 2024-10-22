import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";

await connectdb()

export async function DELETE() {
    const id = getokenid()
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }

    const delekey = await User.findByIdAndUpdate(id, {
        $unset:{
            apikey: 1
        }
    }, {new: true})

    if (!delekey) {
        return NextResponse.json({success: false, message: "server error to remove apikey"},{status: 500})
    }

    return NextResponse.json({success: true, data: {}, message: "api key removed successfully"}, {status: 200})
}