import { Members } from "@/db/models/Members";
import { Notifications } from "@/db/models/Notifications";
import { Servers } from "@/db/models/Server";
import { CreateNotificationBody, CreateNotificationListBody } from "@/types/notifications.types";
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

export async function createNotifForChannelUsers(body: CreateNotificationListBody) {
  try {
    const server_oid = new ObjectId(body.server);
    const server = await Servers.findOne({ _id: server_oid });

    if (!server) {
      return;
    }

    const membersData = await Members.find({ server_id: body.server }).toArray();
    const memberIds = membersData.map((member) => member.member_id.toString());
    memberIds.push(server.owner.toString());

    await Promise.all(
      memberIds.map((memberId) =>
        createNotif({ type: body.type, destined_user: memberId, source_id: body.source_id, sender: body.sender })
      )
    );

    return memberIds;
  } catch (error) {
    return error;
    console.error("Error in createNotifForChannelUsers:", error);
  }
}
