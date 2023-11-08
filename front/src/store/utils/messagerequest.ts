import axios from "axios";
//import { emitEvent } from "../../utils/ws";

const API_BASE_URL = "http://localhost:3001";

export async function getChannelsByUser(id: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/mp/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getMessagesByMp(id: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/mp/${id}/messages`);

    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function sendMp(sender: string, content: string, channel: string) {
  try {
    const res = await axios.post(`${API_BASE_URL}/mp/send`, {
      sender: sender,
      content: content,
      channel: channel,
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}
