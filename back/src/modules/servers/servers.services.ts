import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";
import { ObjectId } from "mongodb";

export async function createServer(body: ServerCreateBody) {
  await Servers.insertOne({
    name: body.name,
    icon: body.icon,
    owner: body.owner,
  });
}
export async function getServersByUser(user_id: string) {
  try {
    const servers = await Servers.find({ owner: user_id }).toArray();
    return servers;
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}

export async function getServerById(id: string) {
  try {
    var oid = new ObjectId(id);
    const servers = await Servers.findOne({ _id: oid });
    return servers;
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}
