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

export async function getServer({ serverName }: { serverName: string }) {
  try {
    let res = await axios.get(`${API_BASE_URL}/server/getByName/` + serverName, { withCredentials: true });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: error };
  }
}
