export interface FriendsCreateBody {
  receiver_name: string;
  initiator_id: string;
}

export interface FriendsAcceptBody {
  receiver_id: string;
  initiator_id: string;
}

export interface Friend {
  receiver: string;
  initiator: string;
  status: string;
}
