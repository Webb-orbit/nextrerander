import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function DELETE(req, { params }) {
    const {docid} = await params
    const id =  await getokenid()
    if (!isValidObjectId(docid)) {
        return NextResponse.json({ success: false, message: "document id is required" }, { status: 400 })
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const deletedoc = await Docs.findOneAndDelete({
        $and: [
            { _id: docid },
            { creator: id }
        ]
    })

    if (!deletedoc) {
        return NextResponse.json({ success: false, message: "unable to delete you document" }, { status: 500 })
    }

    if (deletedoc.shared) {
        const deleteshare = await Share.findOneAndDelete({
            $and: [
                { _id: deletedoc.shareid },
                { shareddoc: deletedoc._id },
                { creator: id }
            ]
        })

        if (!deleteshare) {
            return NextResponse.json({ success: null, message: "failed to delete share but document deleted successfully" }, { status: 200 })
        }

        return NextResponse.json({ success: true, message: "you document and share both deleted successfully" }, { status: 200 })
    }

    return NextResponse.json({ success: true, message: "you document deleted success fully" }, { status: 200 })
}