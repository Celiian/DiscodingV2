export interface MessageCreateBody {
  channel: string;
  sender: string;
  content: string;
}

export interface Message {
  channel: string;
  sender: string;
  content: string;
  date: Date;
}
