import { getokenid } from "@/utils/gettokenid"
import { isValidObjectId } from "mongoose"
import { NextResponse } from "next/server"
import { Offlinedoc } from "@/models/offlinemodel"
import ip from "ip"

export async function GET(req, { params }) {
    const offdocid = params.offdocid;
    const id = await getokenid();
    const ipress = ip.address('private', 'ipv4')
    if (!isValidObjectId(id)) {
        return NextResponse.json({ success: false, message: "invaild token id" }, { status: 400 })
    }
    if (!isValidObjectId(offdocid)) {
        return NextResponse.json({ success: false, message: "document id not valid" }, { status: 400 })
    }

    const offdoc = await Offlinedoc.findOne({
        $and: [
            { creator: id },
            { _id: offdocid },
        ]
    })

    if (!offdoc) {
        return NextResponse.json({ success: false, message: "server error or document not found" }, { status: 500 })
    }
    if (!ip.isEqual(offdoc.ipadd, ipress)) {
        return NextResponse.json({ success: false, message: "you can not get this document in this device" }, { status: 500 })
    }

    return NextResponse.json({success:true, data:{...offdoc._doc}, message: "yo!"}, {status: 200})
}