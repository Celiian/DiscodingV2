import { Express, Request, Response } from "express";
import { getUserById, editUser } from "./users.services";
import { EditUserBody } from "@/types/auth.types";

export function registerUsersRoutes(app: Express) {
  app.get("/user/:id", async (req: Request<{ id: string }, unknown, unknown>, res: Response) => {
    try {
      const id = req.params.id;
      const user = await getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/user", async (req: Request<unknown, unknown, EditUserBody>, res: Response) => {
    try {
      const { id, username, icon, password } = req.body;

      const result = await editUser({ id, username, icon, password });

      if (result.succes) {
        res.status(200);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
