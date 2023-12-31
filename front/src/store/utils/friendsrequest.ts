import axios from "axios";
import { emitEvent } from "../../utils/ws";

// Titi#4565
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function addFriendRequest({
  receiver_name,
  initiator_id,
}: {
  receiver_name: string;
  initiator_id: string;
}) {
  try {
    const res = await axios.post(`${API_BASE_URL}/friends/add`, { receiver_name, initiator_id });
    if (res.data.success) {
      emitEvent({ event: "friend-add", data: res.data.data });
    }
    return res.data;
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function acceptFriendRequest({
  receiver_id,
  initiator_id,
}: {
  receiver_id: string;
  initiator_id: string;
}) {
  try {
    const res = await axios.post(`${API_BASE_URL}/friends/accept`, { receiver_id, initiator_id });
    return res.data;
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function rejectFriendRequest({
  receiver_id,
  initiator_id,
}: {
  receiver_id: string;
  initiator_id: string;
}) {
  try {
    const res = await axios.post(`${API_BASE_URL}/friends/reject`, { receiver_id, initiator_id });
    return res.data;
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getFriendsList(user_id: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/friends/get/${user_id}`);
    return res.data;
  } catch (error) {
    return { success: false, data: error };
  }
}
