// userStore.ts
import { defineStore } from "pinia";
import { login, register } from "./utils/userrequest";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null as null | any,
  }),
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      let res = await login({ email, password });
      if (res.succes) {
        this.currentUser = res.user;
      } else {
        console.error("Registration failed:", res.error);
        throw res.error;
      }
    },
    async register({ email, username, password }: { email: string; username: string; password: string }) {
      let res = await register({ email, username, password });
      if (res.succes) {
        this.currentUser = res.user;
      } else {
        console.error("Registration failed:", res.error);
        throw res.error;
      }
    },
    logout() {
      this.currentUser = null;
    },
  },
});
