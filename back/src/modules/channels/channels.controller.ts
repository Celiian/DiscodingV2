import { Express, Request, Response } from "express";
import { getMpByUser } from "./channels.services";

export function registerChannelssRoutes(app: Express) {
  app.get("/mp/:id", async (req: Request<{ id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.id;
      const channel = await getMpByUser(id);
      if (!channel) {
        res.status(404).json({ error: "No channel found" });
      } else {
        res.json(channel);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
