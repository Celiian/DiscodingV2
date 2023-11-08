import { Invitations } from "@/db/models/Invitations";
import { Members } from "@/db/models/Members";
import { InvitationsCreateBody } from "@/types/invitations.types";
import { MemberCreateBody } from "@/types/members.types";

export async function createInvite(body: InvitationsCreateBody) {
  const res = await Invitations.insertOne({
    server_id: body.server_id,
    expiration: body.expiration,
    creator: body.creator,
    link: "url",
  });
  return res;
}

export async function acceptInvite(body: MemberCreateBody) {
  const res = await Members.insertOne({
    member_id: body.member_id,
    server_id: body.server_id,
    roles: [],
  });
  return res;
}
