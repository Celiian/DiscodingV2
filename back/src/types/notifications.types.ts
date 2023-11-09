export interface CreateNotificationBody {
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
}

export interface Notification {
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
  count: number;
}
