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
