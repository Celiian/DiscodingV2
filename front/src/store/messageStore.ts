// messageStore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getChannelsByUser } from "./utils/messagerequest";

export const useMessageStore = defineStore("message", {
  state: () => ({
    channels: [],
  }),

  actions: {
    async getMpChannels() {
      const userStore = useUserStore();
      const user = userStore.getCurrentUser();
      const res = await getChannelsByUser(user._id.toString());
      this.channels = res.data;
      console.log(this.channels);
      console.log(res.data);

      return res;
    },
    async getCurrentChannels() {
      return this.channels;
    },
  },
});
