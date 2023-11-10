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
  leaveServer,
  createInvite,
  acceptInvite,
  getServerByInviteId,
} from "./utils/serverrequest";
import { useUserStore } from "./userstore";

interface Server {
  _id: string;
  name: String;
  icon: string;
  owner: String;
}

export const useServerStore = defineStore("server", {
  state: () => ({
    serverList: <Array<Server>>[],
  }),
  actions: {
    async createServer({ serverName, icon }: { serverName: string; icon: string }) {
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

    async leaveServer({ member_id, server_id }: { member_id: string; server_id: string }) {
      const res = await leaveServer({ member_id, server_id });
      return res;
    },

    async getChannelsServer(id: string) {
      const res = await getChannelsByServer(id);
      return res.data;
    },

    async getServerByInviteId({ invite_id }: { invite_id: string }) {
      const res = await getServerByInviteId({ invite_id: invite_id });
      if (res.success) {
        return res.data;
      } else {
        return res;
      }
    },

    async createInvite({
      server_id,
      expiration,
      limit,
      creator,
    }: {
      server_id: String;
      expiration: Date;
      limit: number;
      creator: String;
    }) {
      const res = await createInvite({ server_id, expiration, limit, creator });
      return res;
    },

    async acceptInvite({ invite_id, member_id }: { invite_id: string; member_id: String }) {
      const res = await acceptInvite({ invite_id, member_id });
      return res;
    },
  },
});
