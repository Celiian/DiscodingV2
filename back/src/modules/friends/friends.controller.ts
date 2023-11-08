import { Express, Request, Response } from "express";
import { addFriend, acceptFriend, getFriends, rejectFriend } from "./friends.services";
import { FriendsAcceptBody, FriendsCreateBody } from "@/types/friends.types";

export function registerFriendsRoutes(app: Express) {
  app.post("/friends/add", async (req: Request<unknown, unknown, FriendsCreateBody>, res: Response) => {
    let result = await addFriend(req.body);
    res.json(result);
  });

  app.post("/friends/accept", async (req: Request<unknown, unknown, FriendsAcceptBody>, res: Response) => {
    let result = await acceptFriend(req.body);
    res.json(result);
  });

  app.post("/friends/reject", async (req: Request<unknown, unknown, FriendsAcceptBody>, res: Response) => {
    let result = await rejectFriend(req.body);
    res.json(result);
  });

  app.get("/friends/get/:user_id", async (req: Request<{ user_id: string }, unknown, unknown>, res: Response) => {
    let result = await getFriends(req.params.user_id);
    res.json(result);
  });
}
