const API_BASE_URL = "http://localhost:3001";
import axios from "axios";

export async function login({ email, password }: { email: string; password: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    let currentUser = response.data.user;
    return { succes: true, user: currentUser };
  } catch (error) {
    return { succes: false, error: error };
  }
}

export async function register({ email, username, password }: { email: string; username: string; password: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, username, password });
    let currentUser = response.data.user;
    return { succes: true, user: currentUser };
  } catch (error) {
    return { succes: false, error: error };
  }
}
