import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function POST(req, { params }) {
    const { privated } = await req.json()
    const documentid = params.docid
    const id = await getokenid()
    if (!isValidObjectId(documentid)) {
        return NextResponse.json({ success: false, message: "document id is required" }, { status: 400 })
    }
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    const exeitshare = await Share.findOne({ shareddoc: documentid })
    if (exeitshare) {
        return NextResponse.json({ success: false, message: "share document is alrady exgisted" }, { status: 400 })
    }

    const newshare = await Share.create({
        privated,
        views: 0,
        shareddoc: documentid,
        creator: id
    })

    if (!newshare) {
        return NextResponse.json({ success: false, message: "server error when creating share" }, { status: 500 })
    }

    const shareddocu = await Docs.findOneAndUpdate(
        {
            $and: [
                { creator: id },
                { _id: documentid }
            ]
        }, {
        shared: true,
        shareid: newshare._id
    }, { new: true })

    if (!shareddocu) {
        return NextResponse.json({ success: false, message: "server error when updateing document" }, { status: 500 })
    }


    return NextResponse.json({ success: true, data: { ...newshare?._doc, shareddocu }, message: "new share are ready" }, { status: 200 })
}