import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { registerAuthRoutes } from "./modules/auth/auth.controller";
import { registerServerRoutes } from "./modules/servers/servers.controller";
import { registerInvitationsRoutes } from "./modules/invitations/invitations.controller";
import { registerFriendsRoutes } from "./modules/friends/friends.controller";
import { isLogin } from "./modules/auth/auth.middleware";
import { initSocketio } from "./websocket";

export function initWebServer() {
  // Creation du serveur http
  const app = express();
  const server = createServer(app);

  initSocketio(server);

  // Utilise le plugin CORS
  app.use(
    cors({
      credentials: true,
      origin: (_error, cb) => {
        cb(null, true);
      },
    })
  );

  // lire les cookies
  app.use(cookieParser());

  // permet de décoder le contenu des requetes http (de type JSON)
  app.use(express.json({ limit: "10mb" }));

  // Add isLogin middleware
  app.use(isLogin);

  // On enregistre nos controllers
  registerAuthRoutes(app);
  registerServerRoutes(app);
  registerInvitationsRoutes(app);
  registerFriendsRoutes(app);
  // On ecoute sur le port configuré avec le .env
  server.listen(process.env.NODE_PORT, () => {
    console.log(`Listening on http://localhost:${process.env.NODE_PORT}`);
  });

  return { server, app };
}
