import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { getokenid } from "@/utils/gettokenid";
import { uploadoncloud, deleteoncloud } from "@/utils/mideacloud";

await connectdb()

export async function PATCH(req) {
    const id = getokenid()
    const rowdata = await req.formData()
    const avatar = rowdata.get('avater')
        
    const fileBuffer = await avatar.arrayBuffer();
    const base64String = Buffer.from(fileBuffer).toString('base64');
    const base64Data = `data:${avatar.type};base64,${base64String}`;  
    if (!id) {
        return NextResponse.json({success: false, message: "token id not found or invalid credentials"},{status: 400})
    }
    if (!base64Data) {
        return NextResponse.json({success: false, message: "avatar is required"},{status: 400})
    }
    
    const uploadnew = await uploadoncloud(base64Data)
    if (!uploadnew) {
        return NextResponse.json({success: false, message: "server error to new avatar not uploaded"},{status: 500})
    }

    const update = await User.findByIdAndUpdate(id,{
        $set:{
            logo: uploadnew.url
        }
    }, {new: false}).select("logo")

    if (!update) {
        await deleteoncloud(uploadnew.url)
        return NextResponse.json({success: false, message: "updation failed"},{status: 500})
    }

    //  chack this logic
    await deleteoncloud(update.logo)

    return NextResponse.json({success: true, data:uploadnew.url, message: "logo updated successfully"}, {status: 200});
}