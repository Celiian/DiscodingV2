export interface MessageCreateBody {
  channel: string;
  sender: string;
  content: string;
  file: string;
}

export interface Message {
  channel: string;
  sender: string;
  content: string;
  file: string;
  date: Date;
}
