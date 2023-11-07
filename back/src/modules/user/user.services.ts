import { Users } from "@/db/models/User"
import { AuthRegisterBody } from "@/types/auth.types"



export async function getByEmail(body: AuthRegisterBody) {
    const user = await Users.findOne({ email: body.email })
    if (!user) {
        return { success: false, message: 'bad email' }
    }
    return { success: true, user };
}