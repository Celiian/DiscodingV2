import { Friends } from "@/db/models/Friends";

import { Users } from "@/db/models/User";
import { FriendsAcceptBody, FriendsCreateBody } from "@/types/friends.types";

export async function addFriend(body: FriendsCreateBody) {
  const receiver = await Users.findOne({
    username: body.receiver_name.split("#")[0],
    tag: "#" + body.receiver_name.split("#")[1],
  });

  if (receiver) {
    const request = await Friends.findOne({
      receiver: receiver?._id.toString(),
      initiator: body.initiator_id,
    });

    if (request) {
      return { success: false, data: "A request have already been done" };
    } else {
      const request_inversed = await Friends.findOne({
        receiver: receiver?._id.toString(),
        initiator: body.initiator_id,
      });

      if (request_inversed) {
        return { success: false, data: "A request have already been done" };
      }
    }

    await Friends.insertOne({
      initiator: body.initiator_id,
      receiver: receiver._id.toString(),
      status: "pending",
    });
    return { success: true, data: receiver._id };
  } else {
    return { success: false, data: "user not found" };
  }
}

export async function acceptFriend(body: FriendsAcceptBody) {
  try {
    const res = await Friends.findOneAndUpdate(
      {
        initiator: body.initiator_id,
        receiver: body.receiver_id,
        status: "pending",
      },
      { $set: { status: "accepted" } }
    );

    return { success: true, data: res };
  } catch (error) {
    return { success: true, data: error };
  }
}

export async function rejectFriend(body: FriendsAcceptBody) {
  try {
    const res = await Friends.findOneAndUpdate(
      {
        initiator: body.initiator_id,
        receiver: body.receiver_id,
        status: "pending",
      },
      { $set: { status: "refused" } }
    );

    return { success: true, data: res };
  } catch (error) {
    return { success: true, data: error };
  }
}

export async function getFriends(user_id: string) {
  try {
    const friends: any[] = [];
    const initiated = await Friends.find({
      initiator: user_id,
      status: "accepted",
    }).toArray();

    const received = await Friends.find({
      receiver: user_id,
      status: "accepted",
    }).toArray();

    friends.push(...initiated);
    friends.push(...received);

    const pending: any[] = [];
    const initiated_pending = await Friends.find({
      initiator: user_id,
      status: "pending",
    }).toArray();

    const received_pending = await Friends.find({
      receiver: user_id,
      status: "pending",
    }).toArray();

    pending.push(...initiated_pending);
    pending.push(...received_pending);

    const rejected: any[] = [];
    const initiated_rejected = await Friends.find({
      initiator: user_id,
      status: "rejected",
    }).toArray();

    const received_rejected = await Friends.find({
      receiver: user_id,
      status: "rejected",
    }).toArray();

    pending.push(...initiated_rejected);
    pending.push(...received_rejected);

    return { success: true, data: { friends: friends, pending: pending, rejected: rejected } };
  } catch (error) {
    return { success: true, data: error };
  }
}
