import { Express, Request, Response } from "express";
import { CreateNotificationBody } from "@/types/notifications.types";
import { getNotifs, createNotif, deleteNotif } from "./notifications.services";

export function registerNotificationsRoutes(app: Express) {
  app.get("/notif/:user_id", async (req: Request<{ user_id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.user_id;
      const messages = await getNotifs(id);
      if (!messages) {
        res.status(404).json({ error: "No channel found" });
      } else {
        res.json(messages);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/notif/:notif_id", async (req: Request<{ notif_id: string }, unknown, unknown>, res: Response) => {
    try {
      const notif_id = req.params.notif_id;
      let result = await deleteNotif(notif_id);
      if (!result) {
        res.status(404).json({ error: "No channel found" });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/notif", async (req: Request<unknown, unknown, CreateNotificationBody>, res: Response) => {
    try {
      let result = await createNotif(req.body);
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
