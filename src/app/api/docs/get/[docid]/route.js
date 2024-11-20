import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";


await connectdb()
export async function GET(req, {params}) {
    const {docid} = await params
    const id = await getokenid()
    if (!isValidObjectId(docid)) {
        return NextResponse.json({success: false, message: "document id is required"}, {status: 400})
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const clientdoc = await Docs.findOne({
        $and: [
            { creator: id },
            { _id: docid }
        ]
    })

    if (!clientdoc) {
        return NextResponse.json({ success: false, message: "you not get other user's document" }, { status: 422 })
    }

    return NextResponse.json({success: true, data:{...clientdoc._doc}, message: "your document"}, {status: 200})

}