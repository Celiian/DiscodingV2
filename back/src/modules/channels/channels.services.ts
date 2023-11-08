import { Channels } from "@/db/models/Channel";

export async function getMpByUser(id: string) {
  const res = await Channels.find({ users: id }).toArray();
  return res;
}
