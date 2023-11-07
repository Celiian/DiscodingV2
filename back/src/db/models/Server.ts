import { db } from "../mongo";

interface Server {
  name: String;
}

export const Users = db!.collection<Server>("servers");
