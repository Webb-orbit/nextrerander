import { connectdb } from "@/db/dbconnect"
import { Docs } from "@/models/docsmodel"
import { Share } from "@/models/sharesmodel"
import { getokenid } from "@/utils/gettokenid"
import { NextResponse } from "next/server"

await connectdb()

export async function POST(req) {
    const { title, content, shared } = await req.json()
    const id = await getokenid()
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }
    if (!title) {
        return NextResponse.json({ success: false, message: "title is required" }, { status: 400 })
    }

    const newdoc = await Docs.create({
        title,
        content: content || "hello",
        shared,
        creator: id
    })

    if (!newdoc) {
        return NextResponse.json({ success: false, message: "something went white createing document" }, { status: 500 })
    }
    if (shared) {
        const newshare = await Share.create({
            views: 0,
            shareddoc: newdoc._id,
            creator: id
        })

        if (!newshare) {
            return NextResponse.json({ success: false, message: "server error when creating share" }, { status: 500 })
        }
        const updareddocs = await Docs.findByIdAndUpdate(newdoc._id, {
            shareid: newshare._id
        }, { new: true })

        if (!updareddocs) {
            return NextResponse.json({ success: false, message: "server error when upadating docs" }, { status: 500 })
        }

        return NextResponse.json({success: true, data:{document: updareddocs, sharedocument: newshare}, message: "new doc created with share doc"}, {status: 200})
    }

    return NextResponse.json({success: true, data:{ ...newdoc._doc }, message: "new doc created"}, {status: 200})
}