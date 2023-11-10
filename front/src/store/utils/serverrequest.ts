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

export async function createInvite({
  server_id,
  expiration,
  limit,
  creator,
}: {
  server_id: String;
  expiration: Date;
  limit: number;
  creator: String;
}) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/invite/create`,
      {
        server_id: server_id,
        expiration: expiration,
        limit: limit,
        creator: creator,
      },
      { withCredentials: true }
    );
    return { success: true, data: res };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function acceptInvite({ invite_id, member_id }: { invite_id: string; member_id: String }) {
  try {
    await axios.post(
      `${API_BASE_URL}/invite/create`,
      {
        invite_id: invite_id,
        member_id: member_id,
      },
      { withCredentials: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function leaveServer({ member_id, server_id }: { member_id: string; server_id: string }) {
  try {
    await axios.post(
      `${API_BASE_URL}/server/leave`,
      {
        member_id: member_id,
        server_id: server_id,
      },
      { withCredentials: true }
    );
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}

export async function getServerByInviteId({ invite_id }: { invite_id: string }) {
  try {
    const server = await axios.get(`${API_BASE_URL}/server/` + invite_id, { withCredentials: true });
    return { success: true, data: server };
  } catch (error) {
    console.log(error);
    return { success: false, data: error };
  }
}
