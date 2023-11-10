// userStore.ts
import { defineStore } from "pinia";
import { login, register, auth, getUserByid, edit, getUserByName } from "./utils/userrequest";

interface User {
  _id: string;
  tag: String;
  email: string;
  username: string;
  password: string;
  token: string;
  createdAt: Date;
  icon: string;
}

interface StateType {
  currentUser: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): StateType => ({
    currentUser: null,
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      let res = await login({ email, password });

      if (res?.success) {
        this.currentUser = res.data;
      } else {
        console.error("Registration failed:", res?.data);
        throw res?.data;
      }
    },
    async register({ email, username, password }: { email: string; username: string; password: string }) {
      let res = await register({ email, username, password });
      if (res?.success) {
        this.currentUser = res.data;
      } else {
        console.error("Registration failed:", res?.data);
        throw res?.data;
      }
    },
    async auth() {
      return this.currentUser !== null ? true : await this.handleAuth();
    },
    async handleAuth() {
      let res = await auth();
      if (res.success) {
        this.currentUser = res.data;
      }
      return res.success;
    },
    getCurrentUser(): User | null {
      return this.currentUser;
    },
    async getUser({ id }: { id: string }): Promise<{ success: boolean; data: User }> {
      const res = await getUserByid({ user_id: id });
      return { success: res.success, data: res.data };
    },

    async getUserByName({ username, tag }: { username: string; tag: string }) {
      const res = await getUserByName({ name: username, tag: tag });
      return { success: res.success, data: res.data };
    },

    async editUser({ id, icon, username, password }: { id: string; icon: string; username: string; password: string }) {
      edit({ id, icon, username, password });
      await this.handleAuth();
    },
  },
});
