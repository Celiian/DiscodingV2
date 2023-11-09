// userStore.ts
import { defineStore } from "pinia";
import { login, register, auth, getUserByid, edit } from "./utils/userrequest";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null as null | any,
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
    getCurrentUser() {
      return this.currentUser;
    },
    async getUser({ id }: { id: string }) {
      const res = await getUserByid({ user_id: id });
      return { success: res.success, data: res.data };
    },

    async editUser({ id, icon, username, password }: { id: string; icon: string; username: string; password: string }) {
      edit({ id, icon, username, password });
      await this.handleAuth();
    },
  },
});
