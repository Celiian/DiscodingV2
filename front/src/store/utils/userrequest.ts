const API_BASE_URL = "http://localhost:3001";
import axios from "axios";

export async function login({ email, password }: { email: string; password: string }) {
  try {
    await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
    let res = await auth();
    return res;
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function register({ email, username, password }: { email: string; username: string; password: string }) {
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, { email, username, password }, { withCredentials: true });
    let res = await auth();
    return res;
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function auth() {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
    let user = response.data;
    return { success: true, data: user };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function getUserByid({ user_id }: { user_id: string }) {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/` + user_id, { withCredentials: true });

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, data: error };
  }
}

export async function edit({
  id,
  icon,
  username,
  password,
}: {
  id: string;
  icon: string;
  username: string;
  password: string;
}) {
  try {
    await axios.put(`${API_BASE_URL}/user`, { id, icon, username, password }, { withCredentials: true });
    return { success: true };
  } catch (error) {
    return { success: false, data: error };
  }
}
