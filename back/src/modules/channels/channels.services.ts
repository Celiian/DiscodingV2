import { Channels } from "@/db/models/Channel";
import { Messages } from "@/db/models/Messages";
import { MessageCreateBody } from "@/types/messages.types";

export async function getMpByUser(id: string) {
  const res = await Channels.find({ users: id }).toArray();
  return res;
}

export async function getMpByChannel(id: string) {
  const res = await Messages.find({ channel: id }).toArray();
  return res;
}

export async function sendMessage(body: MessageCreateBody) {
  const res = await Messages.insertOne({
    sender: body.sender,
    content: body.content,
    channel: body.channel,
    date: new Date(),
  });
  return res;
}
