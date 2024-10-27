import { connectdb } from "@/db/dbconnect";
import { Docs } from "@/models/docsmodel";
import { getokenid } from "@/utils/gettokenid";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

await connectdb()

export async function POST(req) {
    const id = await getokenid()
    console.log(id);
    
    const data = await req.json()

    if (!isValidObjectId(id)) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    console.log(data);
    const page = data?.page || 0;
    const limit = 12;
    const q = data?.q || ""

    const documentcount = await Docs.countDocuments({ creator: id })
    if (!documentcount) {
        return NextResponse.json({ success: false, data: { documentcount }, message: "no documents found" }, { status: 400 })
    }
    let hasmore = (documentcount - page * limit) > limit
    let searchQuery = { creator: id };
    if (q) {
        searchQuery.title = { $regex: q, $options: "i" };
    }

    const alldocs = await Docs.find({ creator: id })
    .sort({ createdAt: -1 })
    .skip(page * limit)
    .limit(Number(limit));
    
    // Docs.aggregate([
    //     { $match: {creator: id} },
    //     { $sort: { "createdAt": -1 } },
    //     { $skip: page * limit },
    //     { $limit: Number(limit) },
    // ])

    if (!alldocs?.length && documentcount > 0) {
        return NextResponse.json({ success: false, data: { alldocs }, message: "server error to find doduments" }, { status: 500 })
    }
    if (!alldocs?.length) {
        return NextResponse.json({ success: true, data: { alldocs }, message: "no documents found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: { doc: [...alldocs], count: documentcount, page: Number(page), limit: Number(limit), hasmore: hasmore }, message: "clients documents" }, { status: 200 })

}