import { Offlinedoc } from "@/models/offlinemodel"
import { getokenid } from "@/utils/gettokenid"
import { NextResponse } from "next/server"

export default async function GET() {
    const id = await getokenid()
    if (!id) {
        return NextResponse({success: false, message: "user not signed in"}, { status: 400})
    }

    const documentcount = await Offlinedoc.countDocuments({ creator: id })
    if (!documentcount) {
        return NextResponse.json({ success: false, data: { documentcount }, message: "no documents found" }, { status: 400 })
    }
    const offlinedata = await Offlinedoc.find({creator: id})
    .sort({ createdAt: -1 })

    if (!offlinedata) {
        return NextResponse({success: false, message: "failed to get offline docs" }, {status: 500})
    }

    return NextResponse({success: true, data:{doc: {...offlinedata._doc}}, message:"yo! you docs"}, {status: 200})
    
}