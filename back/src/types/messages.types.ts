export interface MessageCreateBody {
  channel: string;
  sender: string;
  content: string;
  type: string;
}

export interface Message {
  channel: string;
  sender: string;
  content: string;
  type: string;
  date: Date;
}
