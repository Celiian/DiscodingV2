import { Invitations } from "@/db/models/Invitations";
import { Members } from "@/db/models/Members";
import { InvitationsCreateBody, InvitationsAcceptBody } from "@/types/invitations.types";
import { ObjectId } from "mongodb";

export async function createInvite(body: InvitationsCreateBody) {
  const res = await Invitations.insertOne({
    server_id: body.server_id,
    expiration: body.expiration,
    creator: body.creator,
    limit: body.limit,
  });
  return res;
}

export async function acceptInvite(body: InvitationsAcceptBody) {
  try {
    const oid = new ObjectId(body.invite_id);
    const invite = await Invitations.findOne({ _id: oid });

    if (
      invite &&
      (invite.limit > 0 || invite.limit == -1) &&
      new Date(invite!.expiration).getTime() > new Date().getTime()
    ) {
      await Invitations.findOneAndUpdate({ _id: oid }, { $set: { limit: invite.limit - 1 } });
      const res = await Members.insertOne({
        member_id: body.member_id,
        server_id: invite.server_id,
        roles: [],
      });

      console.log(res);
      return res;
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error accepting invite:", error);
    return { success: false, error: error };
  }
}
