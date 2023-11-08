import { Notification } from "@/types/notifications.types";
import { db } from "../mongo";

export const Notifications = db!.collection<Notification>("notifications");
