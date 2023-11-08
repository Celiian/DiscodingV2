export interface InvitationsCreateBody {
  server_id: String;
  expiration: Date;
  creator: String;
}

export interface Invitation {
  server_id: String;
  expiration: Date;
  creator: String;
  link: String;
}
