import { ServerCreateBody } from "@/types/servers.types";
import { Express, Request, Response } from "express";
import { createServer, getServerByName } from "./servers.services";

export function registerServerRoutes(app: Express) {
  // on enregistre une route /auth/register
  // .                                        TypeParams, TypeQuery, TypeBody
  app.post("/server/create", async (req: Request<unknown, unknown, ServerCreateBody>, res: Response) => {
    // on call le service auth.register
    await createServer(req.body);
    // on reponds a la requete http avec le result
    res.json({ success: true });
  });

  // Register a route for getting a server by name
  app.get("/server/getByName/:name", async (req: Request<{ name: string }, unknown, unknown>, res: Response) => {
    try {
      const serverName = req.params.name;
      const server = await getServerByName(serverName);

      if (!server) {
        // Server with the specified name was not found
        res.status(404).json({ error: "Server not found" });
      } else {
        // Server found, return it as a response
        res.json(server);
      }
    } catch (error) {
      // Handle any errors that may occur during the process
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
