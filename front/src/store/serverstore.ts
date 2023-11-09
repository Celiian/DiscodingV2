// serverStore.ts
import { defineStore } from "pinia";
import {
  createServer,
  getServerByUser,
  getServerById,
  createChannel,
  getChannelsByServer,
  editChannel,
  createCategory,
} from "./utils/serverrequest";
import { useUserStore } from "./userstore";

export const useServerStore = defineStore("server", {
  state: () => ({
    serverList: [],
  }),
  actions: {
    async createServer({ serverName, icon }: { serverName: string; icon: ArrayBuffer }) {
      const userStore = useUserStore();
      let user = userStore.getCurrentUser();
      await createServer({ serverName: serverName, icon: icon, owner: user._id });
      await this.getServerByUser();
    },

    async getServerByUser() {
      const userStore = useUserStore();
      let user = userStore.getCurrentUser();
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

    async createCategory({ name, server }: { name: string; server: string }) {
      await createCategory(name, server);
    },

    async createChannel({ name, audio, source }: { name: string; audio: boolean; source: string }) {
      await createChannel(name, audio, source);
    },

    async editChannel({ id, name, source }: { id: string; name: string; source: string }) {
      await editChannel(id, name, source);
    },

    async getChannelsServer(id: string) {
      const res = await getChannelsByServer(id);
      return res.data;
    },
  },
});
