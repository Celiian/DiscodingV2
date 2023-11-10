import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";
import { ObjectId } from "mongodb";
import { Members } from "@/db/models/Members";
import { Category } from "@/types/categories.types";
import { Categories } from "@/db/models/Category";
import { Channels } from "@/db/models/Channel";
import { MemberCreateBody } from "@/types/members.types";
import { Invitations } from "@/db/models/Invitations";

export async function createServer(body: ServerCreateBody) {
  try {
    await Servers.insertOne({
      name: body.name,
      icon: body.icon,
      owner: body.owner,
    });
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
}
export async function getServersByUser(user_id: string): Promise<any[]> {
  try {
    const member_array = await Members.find({ member_id: user_id }).toArray();
    const serverIds: ObjectId[] = member_array.map((member) => {
      var oid = new ObjectId(member.server_id as string);
      return oid;
    });

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

export async function createCategory(body: Category) {
  try {
    await Categories.insertOne({
      server: body.server,
      name: body.name,
    });
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
}

export async function getChannelsByServer(id: string) {
  try {
    const channels: Array<any> = [];
    const categoriesMap: Record<string, any> = {};

    const channelsRes = await Channels.find({ type: id }).toArray();
    channels.push(...channelsRes);

    const categoriesRes = await Categories.find({ server: id }).toArray();

    for (const category of categoriesRes) {
      const channel = await Channels.find({ type: category._id.toString() }).toArray();
      categoriesMap[category._id.toString()] = {
        _id: category._id,
        name: category.name,
        channels: channel,
      };
    }

    return { channels, categories: categoriesMap };
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}

export async function leaveServer(body: MemberCreateBody) {
  try {
    await Members.findOneAndDelete({
      member_id: body.member_id,
      server_id: body.server_id,
    });
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
}

export async function getServerByInviteId(invite_id: string) {
  try {
    var oid = new ObjectId(invite_id);
    const invitation = await Invitations.findOne({ _id: oid });
    console.log(invitation)
    var server_oid = new ObjectId(invitation?.server_id.toString());
    const server = await Servers.findOne({ _id: server_oid });
    return server;
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}
