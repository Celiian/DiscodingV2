import { AuthRegisterBody } from "@/types/auth.types";
import { Express, Request, Response } from "express";
import { login, register, getUserById } from "./auth.services";
import { requireLogin } from "./auth.middleware";

export function registerAuthRoutes(app: Express) {
  // on enregistre une route /auth/register
  // .                                        TypeParams, TypeQuery, TypeBody
  app.post("/auth/register", async (req: Request<unknown, unknown, AuthRegisterBody>, res: Response) => {
    // on call le service auth.register
    const result = await register(req.body);

    // on set un cookie si on a un token dans le result
    if (result.token) {
      res.cookie("token", result.token, { expires: new Date(+new Date() + 1000000000), sameSite: "none" });
    }
    // on reponds a la requete http avec le result
    res.json(result);
  });

  app.post("/auth/login", async (req, res) => {
    const result = await login(req.body);
    // on set un cookie si on a un token dans le result
    if (result.token) {
      res.cookie("token", result.token, {
        expires: new Date(+new Date() + 1000000000),
        sameSite: "none",
        secure: true,
      });
    }
    res.json(result);
  });

  app.get("/auth/me", requireLogin, (req, res) => {
    res.json(req.user);
  });

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
}
