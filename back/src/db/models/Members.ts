import { Member } from "@/types/members.types";
import { db } from "../mongo";

export const Members = db!.collection<Member>("members");
