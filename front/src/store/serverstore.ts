// serverStore.ts
import { defineStore } from "pinia";
import { createServer, getServerByUser, getServerById } from "./utils/serverrequest";
import { useUserStore } from "./userstore";

export const useServerStore = defineStore("server", {
  state: () => ({
    serverList: [],
  }),
  actions: {
    async createServer({ serverName, icon }: { serverName: string; icon: ArrayBuffer }) {
      const userStore = useUserStore();
      let user = userStore.getUser();
      await createServer({ serverName: serverName, icon: icon, owner: user._id });
      await this.getServerByUser();
    },

    async getServerByUser() {
      const userStore = useUserStore();
      let user = userStore.getUser();
      let res = await getServerByUser(user._id);
      this.serverList = res.data;
    },

    async getServerById({ id }: { id: string }) {
      let res = await getServerById(id);
      return res.data;
    },

    getServerList() {
      return this.serverList;
    },
  },
});
