export interface Channel {
  name: string;
  type: string;
  audio: boolean;
  users: [string, string];
}
