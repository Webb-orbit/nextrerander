import { NextResponse } from "next/server";
import { User } from "@/models/authmodel";
import { connectdb } from "@/db/dbconnect";
import { deleteoncloud, uploadoncloud } from "@/utils/mideacloud";

await connectdb()

export async function POST(req, res, ) {
    
    const data =  await req.formData();
    const formDataObj = {};
    data.forEach((value, key) => {
        formDataObj[key] = value; 
    });

    
    const {email, username, password, avater} = formDataObj;

    const fileBuffer = await avater.arrayBuffer();
    const base64String = Buffer.from(fileBuffer).toString('base64');
    const base64Data = `data:${avater.type};base64,${base64String}`;    
    

    if ([email, username, password].some(e => e.trim() === "")) {
        return NextResponse.json({ error: "all filds are required", success: false }, { status: 400 })
    }

    if (!avater) {
        return NextResponse.json({ error: "avater is required", success: false }, { status: 400 })
    }

    const clientare = await User.findOne({ email })

    if (clientare) {
        return NextResponse.json({ error: "this email is taked by other user", success: false }, { status: 500 })
    }

    const uploadavatar = await uploadoncloud(base64Data)
    if (!uploadavatar) {
        return NextResponse.json({ error: "unseccess on upload avatar in server", success: false }, { status: 500 })
    }

    const newuser = await User.create({ email, username, password, logo: uploadavatar.url })
    const cresteduer = await User.findById(newuser._id).select("-password -apikey -refreshtokan")
    if (!cresteduer) {
        await deleteoncloud(uploadavatar.url)
        return NextResponse.json({ error: "Acc creation is not successdull", success: false }, { status: 500 })
    }

    return NextResponse.json({
        success: true,
        data: { ...cresteduer._doc },
        message: "your new acc created"
    }, { status: 200 })
}
