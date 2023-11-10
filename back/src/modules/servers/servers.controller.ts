import { ServerCreateBody } from "@/types/servers.types";
import { Express, Request, Response } from "express";
import {
  createServer,
  getServersByUser,
  getServerById,
  leaveServer,
  createCategory,
  getChannelsByServer,
  getServerByInviteId,
} from "./servers.services";
import { Category } from "@/types/categories.types";
import { MemberCreateBody } from "@/types/members.types";

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

  app.post("/server/category", async (req: Request<unknown, unknown, Category>, res: Response) => {
    try {
      await createCategory(req.body);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, data: error });
    }
  });

  app.post("/server/leave", async (req: Request<unknown, unknown, MemberCreateBody>, res: Response) => {
    try {
      await leaveServer(req.body);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, data: error });
    }
  });

  app.get("/server/:id/channels/", async (req: Request<{ id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.id;
      const channels = await getChannelsByServer(id);
      if (!channels) {
        res.status(404).json({ error: "Server not found" });
      } else {
        res.json(channels);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/server/:invite_id/", async (req: Request<{ invite_id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.invite_id;
      const server = await getServerByInviteId(id);
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
