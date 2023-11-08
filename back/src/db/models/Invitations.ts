import { Invitation } from "@/types/invitations.types";
import { db } from "../mongo";

export const Invitations = db!.collection<Invitation>("invitations");
