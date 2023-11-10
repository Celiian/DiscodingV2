export interface CreateNotificationBody {
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
}

export interface CreateNotificationListBody {
  type: string;
  source_id: string;
  sender: string;
  server: string;
}

export interface Notification {
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
  count: number;
}
