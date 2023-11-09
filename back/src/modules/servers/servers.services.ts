import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";
import { ObjectId } from "mongodb";
import { Members } from "@/db/models/Members";
import { Category } from "@/types/categories.types";
import { Categories } from "@/db/models/Category";
import { Channels } from "@/db/models/Channel";

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
    const categoriesMap: Record<string, string[]> = {};

    const res1 = await Channels.find({ type: id }).toArray();
    channels.push(...res1);

    const res2 = await Categories.find({ server: id }).toArray();

    const fetchCategoryChannels = async (categoryId: any) => {
      const channel = await Channels.find({ type: categoryId.toString() }).toArray();
      channels.push(...channel);
      categoriesMap[categoryId.toString()] = channel.map((c) => c.name);
    };

    const fetchPromises = res2.map((category) => fetchCategoryChannels(category._id));
    await Promise.all(fetchPromises);

    return { channels, categories: categoriesMap };
  } catch (error) {
    console.error("Error fetching server data:", error);
    throw error;
  }
}
