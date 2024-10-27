import { getokenid } from "@/utils/gettokenid"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"
import ip from "ip"
import { Offlinedoc } from "@/models/offlinemodel"

export async function PATCH(req, {params}) {
    const { title, content } = await req.json()
    const offdocid = params.offdocid;
    const id = await getokenid();
    const ipress = ip.address('private', 'ipv4')
    if (!isValidObjectId(id)) {
        return NextResponse.json({ success: false, message: "invaild token id" }, { status: 400 })
    }
    if (!isValidObjectId(offdocid)) {
        return NextResponse.json({ success: false, message: "document id not valid" }, { status: 400 })
    }

    const document = await Offlinedoc.findOne({
        $and: [
            { creator: id },
            { _id: offdocid },
        ]
    })

    if (!document) {
        return NextResponse.json({ success: false, message: "document not found" }, { status: 500 })
    }
    if (!ip.isEqual(document.ipadd, ipress)) {
        return NextResponse.json({ success: false, message: "you cannot delete in this device" }, { status: 500 })
    }

    document.title = title;
    document.content = content;
    const newdoc = await document.save({validateBeforeSave: false})
    if (!newdoc) {
        return NextResponse.json({ success: false, message: "server error to update your document" }, { status: 500 })
    }

    return NextResponse.json({success: true, data: {...newdoc._doc}, message:"yo!"}, {status: 200})
}