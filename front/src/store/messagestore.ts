// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getChannelsByUser, getMessagesByChannel, sendMessage } from "./utils/messagerequest";
import { emitEvent } from "../utils/ws";

export const useMessageStore = defineStore("message", {
  state: () => ({
    mp_channels: [],
    messages: [],
  }),

  actions: {
    async getMpChannels() {
      const userStore = useUserStore();
      const user = userStore.getCurrentUser();
      const res = await getChannelsByUser(user._id.toString());
      this.mp_channels = res.data;

      return res;
    },

    async getMessagesByChannel(channel_id: string) {
      const res = await getMessagesByChannel(channel_id);
      this.messages = res.data;
      return res;
    },

    getMessages() {
      return this.messages;
    },

    getCurrentChannels() {
      return this.mp_channels;
    },

    async messageServer({
      sender,
      content,
      channel,
      type,
    }: {
      sender: string;
      content: string;
      channel: string;
      type: string;
    }) {
      const res = await sendMessage(sender, content, channel, type);
      return res;
    },

    async mp({
      sender,
      content,
      channel,
      friend,
      type,
    }: {
      sender: string;
      content: string;
      channel: string;
      friend: string;
      type: string;
    }) {
      const res = await sendMessage(sender, content, channel, type);
      emitEvent({ event: "mp-sent", data: { channel: channel, user: sender, friend: friend } });

      return res;
    },
  },
});
