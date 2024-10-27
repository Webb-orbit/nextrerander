import { getokenid } from "@/utils/gettokenid"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"
import ip from "ip"
import { Offlinedoc } from "@/models/offlinemodel"

export async function POST(req) {
    const { title, content } = await req.json()
    const id = await getokenid()
    if (!isValidObjectId(id)) {
        return NextResponse.json({success: false, message: "invaild token id"},{status: 400})
    }
    if (!title) {
       return NextResponse.json({success: false, message: "title is required"},{status: 400})
    }
    
    const newdoc = await Offlinedoc.create({
        title,
        content,
        creator: id,
        ipadd: ip.address('private', 'ipv4')
    })
    
    if (!newdoc) {
        return NextResponse.json({success: false, message: "something went white createing document"},{status: 500})
    }

    return NextResponse.json({success: true, data:{...newdoc._doc}, message:"new offline doc created"}, {status: 200})
}