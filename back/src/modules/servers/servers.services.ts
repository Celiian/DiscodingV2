import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";
import { ObjectId } from "mongodb";
import { Members } from "@/db/models/Members";

export async function createServer(body: ServerCreateBody) {
  await Servers.insertOne({
    name: body.name,
    icon: body.icon,
    owner: body.owner,
  });
}
export async function getServersByUser(user_id: string): Promise<any[]> {
  try {
    const member_array = await Members.find({ member_id: user_id });

    const serverIds: ObjectId[] = await member_array
      .map((member) => {
        var oid = new ObjectId(member.server_id as string);
        return oid;
      })
      .toArray();

    const servers: any[] = [];

    const member_servers = await Servers.find({ _id: { $in: serverIds } }).toArray();

    const owned_serv = await Servers.find({ owner: user_id }).toArray();

    servers.push(...owned_serv);
    servers.push(...member_servers);

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
