import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";


await connectdb()

export async function PATCH(req, {params}) {
    const {docid} = await params
    const { title, content, shared } = await req.json()
    const id = await getokenid()
    if (!isValidObjectId(docid)) {
        return NextResponse.json({success: false, message: "document id is required"}, {status: 400})
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const updatedoc = await Docs.findOneAndUpdate({
        $and: [
            { creator: id },
            { _id: docid }
        ]
    },{
        $set:{
            title, content, shared
        }
    }, {new: true})

    if (!updatedoc) {
        return NextResponse.json({success: false, message:"unable to update this document"}, {status: 500})
    }

    return NextResponse.json({success: true, data:{...updatedoc._doc}, message:"you document is updated"}, {status: 200})
}