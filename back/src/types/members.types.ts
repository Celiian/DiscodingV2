export interface MemberCreateBody {
  member_id: String;
  server_id: String;
}

export interface Member {
  member_id: String;
  server_id: String;
  roles: Array<String>;
}
