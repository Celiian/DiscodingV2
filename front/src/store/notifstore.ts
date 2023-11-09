// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getNotifForUser, createNewNotif, deleteNotif } from "./utils/notifrequest";

export const useNotifStore = defineStore("notif", {
  state: () => ({
    mp_notifs: [],
    server_notifs: [],
  }),

  actions: {
    async getNotifs() {
      const userStore = useUserStore();
      const res = await getNotifForUser(userStore.getCurrentUser()._id.toString());
      this.mp_notifs = res.data.filter((notif: any) => {
        return notif.type === "mp";
      });

      this.server_notifs = res.data.filter((notif: any) => {
        return notif.type == "server";
      });
      return res.data;
    },
    async createNotif(destined: string, type: string, source_id: string) {
      const userStore = useUserStore();
      const res = await createNewNotif(destined, type, source_id, userStore.getCurrentUser()._id.toString());
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
  },
});
