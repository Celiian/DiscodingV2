// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getChannelsByUser, sendMp, getMessagesByMp } from "./utils/messagerequest";
import { emitEvent } from "../utils/ws";

export const useMessageStore = defineStore("message", {
  state: () => ({
    channels: [],
    messages: [],
  }),

  actions: {
    async getMpChannels() {
      const userStore = useUserStore();
      const user = userStore.getCurrentUser();
      const res = await getChannelsByUser(user._id.toString());
      this.channels = res.data;

      return res;
    },

    async getMessagesMp(channel_id: string) {
      const res = await getMessagesByMp(channel_id);
      this.messages = res.data;
      return res;
    },

    getMessages() {
      return this.messages;
    },

    getCurrentChannels() {
      return this.channels;
    },

    async mp({
      sender,
      content,
      channel,
      friend,
    }: {
      sender: string;
      content: string;
      channel: string;
      friend: string;
    }) {
      const res = await sendMp(sender, content, channel);
      emitEvent({ event: "mp-sent", data: { channel: channel, user: sender, friend: friend } });
      return res;
    },
  },
});
