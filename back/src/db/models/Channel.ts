import { Channel } from "@/types/channels.types";
import { db } from "../mongo";

export const Channels = db!.collection<Channel>("channels");
