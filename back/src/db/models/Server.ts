import { Server } from "@/types/servers.types";
import { db } from "../mongo";

export const Servers = db!.collection<Server>("servers");
