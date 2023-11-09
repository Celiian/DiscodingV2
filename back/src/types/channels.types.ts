export interface ChannelCreateBody {
  name: string;
  audio: boolean;
  source: string;
}

export interface ChannelEditBody {
  id: string;
  name: string;
  source: string;
}

export interface Channel {
  name: string;
  type: string;
  audio: boolean;
  users: [string, string];
}
