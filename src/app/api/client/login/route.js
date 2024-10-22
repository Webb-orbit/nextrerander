import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { GAccandRefToken } from "@/utils/generateassandrefrestokens";
import { cookies } from 'next/headers'
import { connectdb } from "@/db/dbconnect";

const options = {
    secure: true,
    httpOnly: true,
}

await connectdb()

export async function POST(req) {
    const {email, password} = await req.json()

    if ([email, password].some(e => e.trim() === "")) {
        return NextResponse.json({error: "all filds are required"}, {status: 400})
    }
    
    const userexgist = await User.findOne({email})
    
    if (!userexgist) {
        return NextResponse.json({error: "account not found"}, {status: 400})
    }
    
    const passwordcorrect = await userexgist.comparepass(password)
    
    if (!passwordcorrect) {
        return NextResponse.json({success:false, error: "password not mached"}, {status: 400})
    }

    const { Access, Refresh } = await GAccandRefToken(userexgist._id)

    const currentuser = await User.findById(userexgist._id).select("-password -apikey -refreshtokan")

    cookies().set("accesstoken", Access, options)
    cookies().set("refreshtoken", Refresh, options)
    return NextResponse.json({
        message: "user logged in",
        data: {...currentuser?._doc, Access, Refresh},
        success: true
    }, {status: 200})

}