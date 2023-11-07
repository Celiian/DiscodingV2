import { getByEmail } from "./user.services"
import { Express, Request, Response } from "express";
import { AuthRegisterBody } from "@/types/auth.types";



export function getUserInfos(app: Express) {
    app.get('/email', getByEmail, (req: Request<unknown, unknown, AuthRegisterBody>, res: Response) => {
        res.json(req.user)
    })
}