export interface InvitationsCreateBody {
  server_id: String;
  expiration: Date;
  limit: number;
  creator: String;
}

export interface InvitationsAcceptBody {
  invite_id: string;
  member_id: String;
  server_id: String;
}

export interface Invitation {
  server_id: String;
  expiration: Date;
  limit: number;
  creator: String;
}
