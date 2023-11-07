const API_BASE_URL = "http://localhost:3001";
import axios from "axios";

export async function login({ email, password }: { email: string; password: string }) {
  try {
    await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
    let res = await auth();
    return res;
  } catch (error) {
    return { succes: false, data: error };
  }
}

export async function register({ email, username, password }: { email: string; username: string; password: string }) {
  try {
    await axios.post(`${API_BASE_URL}/auth/register`, { email, username, password }, { withCredentials: true });
    let res = await auth();
    return res;
  } catch (error) {
    return { succes: false, data: error };
  }
}

export async function auth() {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
    let user = response.data;
    return { succes: true, data: user };
  } catch (error) {
    return { succes: false, data: error };
  }
}
