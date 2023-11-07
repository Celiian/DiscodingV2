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
      console.log(res);
      if (res?.succes) {
        this.currentUser = res.data;
      } else {
        console.error("Registration failed:", res?.data);
        throw res?.data;
      }
    },
    async register({ email, username, password }: { email: string; username: string; password: string }) {
      let res = await register({ email, username, password });
      if (res?.succes) {
        this.currentUser = res.data;
      } else {
        console.error("Registration failed:", res?.data);
        throw res?.data;
      }
    },
  },
});
