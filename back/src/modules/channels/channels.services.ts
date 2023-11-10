import { ChannelCreateBody, ChannelEditBody } from "@/types/channels.types";
import { MessageCreateBody } from "@/types/messages.types";
import { Channels } from "@/db/models/Channel";
import { Messages } from "@/db/models/Messages";
import { ObjectId } from "mongodb";

export async function getMpByUser(id: string) {
  const res = await Channels.find({ users: id }).toArray();
  return res;
}

export async function getMessagesByChannel(id: string) {
  const res = await Messages.find({ channel: id }).toArray();
  return res;
}

export async function sendMessage(body: MessageCreateBody) {
  const res = await Messages.insertOne({
    sender: body.sender,
    content: body.content,
    channel: body.channel,
    date: new Date(),
    file: body.file,
  });
  return res;
}

export async function createChannel(body: ChannelCreateBody) {
  const res = await Channels.insertOne({
    name: body.name,
    type: body.source,
    audio: body.audio,
    users: ["", ""],
  });

  return res;
}

export async function getChannel(id: string) {
  var oid = new ObjectId(id as string);
  const res = await Channels.find({ channel: oid }).toArray();
  return res;
}

export async function editChannel(body: ChannelEditBody) {
  const oid = new ObjectId(body.id);
  const updatedChannel = await Channels.findOneAndUpdate(
    { _id: oid },
    { $set: { name: body.name, type: body.source } }
  );
  return updatedChannel;
}
