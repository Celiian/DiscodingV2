import { Invitations } from "@/db/models/Invitations";
import { InvitationsCreateBody } from "@/types/invitations.types";

export async function createInvite(body: InvitationsCreateBody) {
  const res = await Invitations.insertOne({
    server_id: body.server_id,
    expiration: body.expiration,
    creator: body.creator,
    link: "url",
  });
  return res;
}
