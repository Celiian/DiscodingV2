import { Notifications } from "@/db/models/Notifications";
import { CreateNotificationBody } from "@/types/notifications.types";
import { ObjectId } from "mongodb";

export async function getNotifs(id: string) {
  const res = await Notifications.find({ destined_user: id }).toArray();
  return res;
}

export async function deleteNotif(notif_id: string) {
  var oid = new ObjectId(notif_id);
  const res = await Notifications.findOneAndDelete({ _id: oid });
  return res;
}

export async function createNotif(body: CreateNotificationBody) {
  // Check if a notification with the same parameters exists
  const existingNotif = await Notifications.findOne({
    destined_user: body.destined_user,
    type: body.type,
    source_id: body.source_id,
    sender: body.sender,
  });

  if (existingNotif) {
    // If it exists, increment the count
    const res = await Notifications.updateOne(
      {
        _id: existingNotif._id,
      },
      {
        $inc: { count: 1 },
      }
    );
    return res;
  } else {
    // If it doesn't exist, insert a new notification
    const res = await Notifications.insertOne({
      destined_user: body.destined_user,
      type: body.type,
      source_id: body.source_id,
      sender: body.sender,
      count: 1,
    });
    return res;
  }
}
