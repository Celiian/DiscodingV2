import { Express, Request, Response } from "express";
import { createInvite } from "./invitations.services";
import { InvitationsCreateBody } from "@/types/invitations.types";

export function registerInvitationsRoutes(app: Express) {
  app.post("/invite/create", async (req: Request<unknown, unknown, InvitationsCreateBody>, res: Response) => {
    let invite = await createInvite(req.body);
    res.json({ success: true, data: invite });
  });
}
