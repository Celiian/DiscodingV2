import { Friend } from "@/types/friends.types";
import { db } from "../mongo";

export const Friends = db!.collection<Friend>("friends");
