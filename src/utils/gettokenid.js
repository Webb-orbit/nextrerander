import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export function getokenid() {
    try {
        const token = cookies().get("refreshtoken")?.value || ""
        const data = jwt.verify(token, process.env.RefreshTokenKey)
        console.log(data);
        return data.id
    } catch (error) {
        return null
    }
}