import { connectdb } from "@/db/dbconnect";
import { Share } from "@/models/sharesmodel";
import { getokenid } from "@/utils/gettokenid";
import { NextResponse } from "next/server";

await connectdb()

export async function GET() {
    const id = await getokenid()
    if (!id) {
        return NextResponse.json({ success: false, message: "token id not found or invalid credentials" }, { status: 400 })
    }

    // const getSharedData = async (id) => {
    //     const data = await Share.find({ creator: id })
    //         .populate({
    //             path: 'shareddoc',
    //             select: '_id'
    //         })
    //         .lean();
    //     console.log(data);
    //     return data
    // }

    // const data = await getSharedData(id)

    // const data = await Share.aggregate([
    //     {
    //         $match: {
    //             creator: id
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "docs",
    //             localField: "shareddoc",
    //             foreignField: "_id",
    //             as: "docdata",
    //         }
    //     },
    //     {
    //         $addFields: {
    //             combinedata: {
    //                 $arrayElemAt: ["$docdata", 0]
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             docdata: 0 
    //         }
    //     }
    // ])

    const data = await Share.find({
            creator: id
    }).populate('shareddoc')

    if (!data?.length) {
        return NextResponse.json({ success: false, demo: data, message: "no shares found" }, { status: 400 })
    }


    return NextResponse.json({ success: true, data, total: data.length , message: "yo yo your shares" }, { status: 200 })
}