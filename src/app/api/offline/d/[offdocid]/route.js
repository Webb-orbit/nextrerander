import { getokenid } from "@/utils/gettokenid"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"
import { Offlinedoc } from "@/models/offlinemodel"
import ip from "ip"

export async function DELETE(req, { params }) {
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

    const deletedoc = await Offlinedoc.findOneAndDelete({
        $and:[
            { creator: id },
            { _id: offdocid },
            {ipadd: ipress}
        ]
    })

    if (!deletedoc) {
        return NextResponse.json({ success: false, message: "server error to delete document" }, { status: 500 })
    }

    return NextResponse.json({success: true, message: "your document deleted successfully", data:{}}, {status: 200})
}