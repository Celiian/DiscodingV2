import { ServerCreateBody } from "@/types/servers.types";
import { Express, Request, Response } from "express";
import { createServer, getServersByUser, getServerById } from "./servers.services";

export function registerServerRoutes(app: Express) {
  app.post("/server/create", async (req: Request<unknown, unknown, ServerCreateBody>, res: Response) => {
    await createServer(req.body);

    res.json({ success: true });
  });

  app.get("/server/byUser/:user_id", async (req: Request<{ user_id: string }, unknown, unknown>, res: Response) => {
    try {
      const user_id = req.params.user_id;

      const servers = await getServersByUser(user_id);

      if (!servers) {
        res.status(404).json({ error: "Server not found" });
      } else {
        res.json(servers);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/server/byId/:id", async (req: Request<{ id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.id;
      const server = await getServerById(id);
      if (!server) {
        res.status(404).json({ error: "Server not found" });
      } else {
        res.json(server);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
