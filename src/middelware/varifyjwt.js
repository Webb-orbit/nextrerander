import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { User } from "@/models/authmodel"

export const varifyjwt = async (req, res, next)=>{
    try { 
        const AccessTokens = cookies().get("accesstoken")  ||  req.headers.authorization?.replace("Bearer: ", "")

        if (!AccessTokens) {
            return NextResponse.json({error: "unautherzied user", success: false}, {status: 400})
        }
        
        const accessvarifyed = jwt.verify(AccessTokens, process.env.AccessTokenKey)
        if (!accessvarifyed) {
            return NextResponse.json({error: "unvarifyed accesstoken", success: false}, {status: 500})
        }
        
        const user = await User.findById(accessvarifyed._id).select("-password -apikey -refreshtokan")
        if (!user) {
            return NextResponse.json({error: "user  not found", success: false}, {status: 500})
        }
        
        req.client = user
        req.mip = ip.address()
        next()
    } catch (error) {
        return NextResponse.json({error: "uexpacted err on varify tokens", success: false}, {status: 500})
    }
}