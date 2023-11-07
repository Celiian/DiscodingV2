import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";

export async function createServer(body: ServerCreateBody) {
  await Servers.insertOne({
    name: body.name,
    icon: body.icon,
    owner: body.owner,
  });
}

export async function getServerByName(serverName: string) {
  const res = await Servers.findOne({ name: serverName });
  return res;
}
