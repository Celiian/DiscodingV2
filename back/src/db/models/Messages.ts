import { Message } from "@/types/messages.types";
import { db } from "../mongo";

export const Messages = db!.collection<Message>("messages");
