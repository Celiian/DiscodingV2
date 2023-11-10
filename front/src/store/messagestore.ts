// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getChannelsByUser, getMessagesByChannel, sendMessage } from "./utils/messagerequest";
import { emitEvent } from "../utils/ws";
import { useNotifStore } from "./notifstore";

export const useMessageStore = defineStore("message", {
  state: () => ({
    mp_channels: [],
    current_channel: "",
    messages: [],
    searched_message: "",
  }),

  actions: {
    getSearchedMessage() {
      return this.searched_message;
    },
    setSearchedMessage(message: any) {
      this.searched_message = message;
    },
    async getMpChannels() {
      const userStore = useUserStore();
      const user = userStore.getCurrentUser();
      const res = await getChannelsByUser(user._id.toString());
      this.mp_channels = res.data;

      return res;
    },

    async getMessagesByChannel(channel_id: string) {
      this.current_channel = channel_id;
      const res = await getMessagesByChannel(channel_id);
      this.messages = res.data;
      return res;
    },

    getCurrentChannel() {
      return this.current_channel;
    },

    leaveChannel() {
      this.current_channel = "";
    },

    getMessages() {
      return this.messages;
    },

    getCurrentChannels() {
      return this.mp_channels;
    },

    async messaage({
      sender,
      content,
      channel,
      server,
    }: {
      sender: string;
      content: string;
      channel: string;
      server: string;
    }) {
      const notifStore = useNotifStore();
      const res = await sendMessage(sender, content, channel);
      emitEvent({ event: "msg-sent", data: { channel: channel, user: sender } });
      const members = await notifStore.notifyChannelUsers({
        type: "msg",
        source_id: channel,
        sender: sender,
        server: server,
      });
      emitEvent({ event: "notif-group", data: { channel: channel, members: members, server: server } });

      return res;
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
      const res = await sendMessage(sender, content, channel);
      emitEvent({ event: "mp-sent", data: { channel: channel, user: sender, friend: friend } });

      return res;
    },
  },
});
