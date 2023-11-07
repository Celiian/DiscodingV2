import { ServerCreateBody } from "@/types/servers.types";
import { Servers } from "@/db/models/Server";
import { Invitations } from "@/db/models/Invitations";
import { InvitationsCreateBody } from "@/types/invitations.types";

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

export async function createInvite(body: InvitationsCreateBody) {
  const res = await Invitations.insertOne({
    server_id: body.server_id,
    expiration: body.expiration,
    creator: body.creator,
    link: "url",
  });
  return res;
}
