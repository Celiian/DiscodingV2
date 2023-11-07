import { ServerCreateBody } from "@/types/servers.types";
import { Express, Request, Response } from "express";
import { createInvite, createServer, getServerByName } from "./servers.services";
import { InvitationsCreateBody } from "@/types/invitations.types";

export function registerServerRoutes(app: Express) {
  app.post("/server/create", async (req: Request<unknown, unknown, ServerCreateBody>, res: Response) => {
    await createServer(req.body);

    res.json({ success: true });
  });

  app.get("/server/getByName/:name", async (req: Request<{ name: string }, unknown, unknown>, res: Response) => {
    try {
      const serverName = req.params.name;
      const server = await getServerByName(serverName);

      if (!server) {
        res.status(404).json({ error: "Server not found" });
      } else {
        res.json(server);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/invite/create", async (req: Request<unknown, unknown, InvitationsCreateBody>, res: Response) => {
    let invite = await createInvite(req.body);
    res.json({ success: true, data: invite });
  });
}
