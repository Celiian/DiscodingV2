import { Express, Request, Response } from "express";
import { acceptInvite, createInvite } from "./invitations.services";
import { InvitationsCreateBody, InvitationsAcceptBody } from "@/types/invitations.types";

export function registerInvitationsRoutes(app: Express) {
  app.post("/invite/create", async (req: Request<unknown, unknown, InvitationsCreateBody>, res: Response) => {
    let invite = await createInvite(req.body);
    res.json({ success: true, data: invite });
  });

  app.post("/invite/accept", async (req: Request<unknown, unknown, InvitationsAcceptBody>, res: Response) => {
    const result = await acceptInvite(req.body);
    res.json(result);
  });
}
