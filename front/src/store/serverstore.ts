// serverStore.ts
import { defineStore } from "pinia";
import { createServer, getServer } from "./utils/serverrequest";

export const useServerStore = defineStore("server", {
  state: () => ({}),
  actions: {
    async createServer({ serverName, icon }: { serverName: string; icon: ArrayBuffer }) {
      await createServer({ serverName: serverName, icon: icon, owner: "celian" });
    },

    async getServer({ serverName }: { serverName: string }) {
      return (await getServer({ serverName: serverName })).data;
    },
  },
});
