const API_BASE_URL = "http://localhost:3001";
import axios from "axios";

export async function createServer({
  serverName,
  icon,
  owner,
}: {
  serverName: string;
  icon: ArrayBuffer;
  owner: String;
}) {
  try {
    let base64Data = "data:image/png;base64, " + arrayBufferToBase64(icon);
    await axios.post(
      `${API_BASE_URL}/server/create`,
      { name: serverName, icon: base64Data, owner: owner },
      { withCredentials: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let binaryString = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

export async function getServerByUser(user_id: { user_id: string }) {
  try {
    let res = await axios.get(`${API_BASE_URL}/server/byUser/` + user_id, { withCredentials: true });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getServerById(id: string) {
  try {
    let res = await axios.get(`${API_BASE_URL}/server/byId/` + id, { withCredentials: true });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function createChannel(name: string, audio: boolean, source: string) {
  try {
    await axios.post(
      `${API_BASE_URL}/channel/create`,
      { name: name, audio: audio, source: source },
      { withCredentials: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function editChannel(id: string, name: string, source: string) {
  try {
    await axios.put(`${API_BASE_URL}/channel`, { name: name, id: id, source: source }, { withCredentials: true });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function createCategory(name: string, server: string) {
  try {
    await axios.post(`${API_BASE_URL}/server/category`, { name: name, server: server }, { withCredentials: true });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function getChannelsByServer(id: string) {
  try {
    let res = await axios.get(`${API_BASE_URL}/server/${id}/channels`, { withCredentials: true });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}
