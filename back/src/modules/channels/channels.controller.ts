import { Express, Request, Response } from "express";
import { getMpByUser, sendMessage, getMpByChannel } from "./channels.services";
import { MessageCreateBody } from "@/types/messages.types";

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

  app.get("/mp/:id/messages", async (req: Request<{ id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.id;
      const messages = await getMpByChannel(id);
      if (!messages) {
        res.status(404).json({ error: "No channel found" });
      } else {
        res.json(messages);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/mp/send", async (req: Request<unknown, unknown, MessageCreateBody>, res: Response) => {
    try {
      let result = await sendMessage(req.body);
      if (!result) {
        res.status(404).json({ error: "No channel found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
