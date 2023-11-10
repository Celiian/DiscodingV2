// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getNotifForUser, createNewNotif, deleteNotif, createNewNotifList } from "./utils/notifrequest";
interface Notification {
  _id: string;
  type: string;
  destined_user: string;
  source_id: string;
  sender: string;
  count: number;
}

export const useNotifStore = defineStore("notif", {
  state: () => ({
    mp_notifs: <Array<Notification>>[],
    server_notifs: <Array<Notification>>[],
  }),

  actions: {
    async getNotifs() {
      const userStore = useUserStore();
      const res = await getNotifForUser(userStore.getCurrentUser()?._id.toString() || "");
      this.mp_notifs = res.data.filter((notif: Notification) => {
        return notif.type === "mp";
      });

      this.server_notifs = res.data.filter((notif: Notification) => {
        return notif.type !== "mp";
      });
      return res.data;
    },
    async createNotif(destined: string, type: string, source_id: string) {
      const userStore = useUserStore();
      const res = await createNewNotif(destined, type, source_id, userStore.getCurrentUser()?._id.toString() || "");
      return res.data;
    },
    async deleteNotif(notif_id: string) {
      const res = await deleteNotif(notif_id);
      await this.getNotifs();
      return res.data;
    },
    getCurrentMpNotifs() {
      return this.mp_notifs;
    },
    getServerNotifs() {
      return this.server_notifs;
    },
    async notifyChannelUsers({
      type,
      source_id,
      sender,
      server,
    }: {
      type: string;
      source_id: string;
      sender: string;
      server: string;
    }) {
      const res = await createNewNotifList(type, source_id, sender, server);
      return res.data;
    },
  },
});
