import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function DELETE(req, { params }) {
    const shareid =  params.shareid
    const id = getokenid()
    if (!isValidObjectId(shareid)) {
        return NextResponse.json({ success: false, message: "document id is required" }, { status: 400 })
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const deleteshare = await Share.findByIdAndDelete(shareid, {new: false})

    if (!deleteshare) {
        return NextResponse.json({ success: false, message: "unable to delete your share" }, { status: 500 })
    }

    const updatedoc = await Docs.findOneAndUpdate({
        $and:[
            {creator: id},
            {shareid: shareid}
        ]
    },{
        shared: false
    }, {new: true})

    if (!updatedoc) {
        return NextResponse.json({ success: null, message: "your share is deleted but unable to update document" }, { status: 200 })
    }

    return NextResponse.json({ success: true, message: "your share is deleted" }, { status: 200 })
}

