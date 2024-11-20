import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function GET(req, { params }) {
    const {shareid} =  await params
    const id = await getokenid()
    if (!isValidObjectId(shareid)) {
        return NextResponse.json({  status:400, success: false, message: "document id is required" }, { status: 400 })
    }
    if (!isValidObjectId(id)) {
        return NextResponse.json({  status:400, success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }


    const shareedoc = await Share.findById(shareid)
    if (!shareedoc) {
        return NextResponse.json({  status:500, success: false, message: "share document not found" }, { status: 500 })
    }

    if (id !== shareedoc.creator.toString() && shareedoc.privated) {
        return NextResponse.json({  status:505, success: false, message: "this document is private" }, { status: 505 })
    }

    const doc = await Docs.findById(shareedoc.shareddoc)

    if (!doc) {
        return NextResponse.json({  status:500, success: false, message: "server error when fetching document" }, { status: 500 })
    }

    return NextResponse.json({ status:200, success: true, data:{ ...shareedoc?._doc, doc }, message: "yo document id here"}, {status: 200});
}