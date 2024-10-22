import { User } from "@/models/authmodel"
import { NextResponse } from "next/server"

export const GAccandRefToken = async(userid)=>{
    try {
        const client = await User.findById(userid)
        const Access = await client.GenerateAccessToken()
        const Refresh = await client.GenerateRefreshToken()
        client.refreshtokan = Refresh
        await client.save({validateBeforeSave: false})
        return {Access, Refresh}
    } catch (error) {
        return NextResponse.json({error: "something wrong generating tokens"}, {status:500})
    }
}