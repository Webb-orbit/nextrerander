import { connectdb } from "@/db/dbconnect";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function PATCH(req, { params }) {
    const {privated, views} = await req.json()
    const shareid =  params.shareid
    const id = getokenid()
    if (!isValidObjectId(shareid)) {
        return NextResponse.json({ success: false, message: "document id is required" }, { status: 400 })
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const updatedshare = await Share.findOneAndUpdate(
        {
            $and:[
                {_id: shareid},
                {creator: id}
            ]
        },
        {
            privated,
            views,
        }, { new: true })

    if (!updatedshare) {
        return NextResponse.json({ success: false, message: "failed to update share" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data:{ ...updatedshare?._doc }, message: "share is updated" }, { status: 200 })
}