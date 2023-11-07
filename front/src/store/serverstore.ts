// serverStore.ts
import { defineStore } from "pinia";
import { createServer, getServer } from "./utils/serverrequest";
import { useUserStore } from "./userstore";

export const useServerStore = defineStore("server", {
  state: () => ({}),
  actions: {
    async createServer({ serverName, icon }: { serverName: string; icon: ArrayBuffer }) {
      const userStore = useUserStore(); // Access your user store instance
      let user = userStore.getUser();
      console.log(user);
      await createServer({ serverName: serverName, icon: icon, owner: user._id });
    },

    async getServer({ serverName }: { serverName: string }) {
      return (await getServer({ serverName: serverName })).data;
    },
  },
});
