import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function getokenid() {
    try {
        const cook = await cookies();
        const token = await cook.get("refreshtoken")?.value || "";
        const data = jwt.verify(token, process.env.RefreshTokenKey)
        console.log(data);
        return data.id
    } catch (error) {
        return null
    }
}