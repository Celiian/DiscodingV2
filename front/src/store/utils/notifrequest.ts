import axios from "axios";
//import { emitEvent } from "../../utils/ws";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getNotifForUser(user_id: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/notif/${user_id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function deleteNotif(notif_id: string) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/notif/${notif_id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function createNewNotif(destined: string, type: string, source_id: string, sender: string) {
  try {
    const res = await axios.post(`${API_BASE_URL}/notif`, {
      destined_user: destined,
      type: type,
      source_id: source_id,
      sender: sender,
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function createNewNotifList(
  type: string,

  source_id: string,
  sender: string,
  server: string
) {
  try {
    const res = await axios.post(`${API_BASE_URL}/notif/users`, {
      type: type,
      source_id: source_id,
      sender: sender,
      server: server,
    });
    console.log(res);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}
