// messagestore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getChannelsByUser, getMessagesByChannel, sendMessage } from "./utils/messagerequest";
import { emitEvent } from "../utils/ws";
import { useNotifStore } from "./notifstore";

interface Message {
  _id: string;
  channel: string;
  sender: string;
  content: string;
  file: string;
  date: Date;
}

interface Channel {
  name: string;
  type: string;
  audio: boolean;
  users: [string, string];
}

export const useMessageStore = defineStore("message", {
  state: () => ({
    mp_channels: <Array<Channel>>[],
    current_channel: "",
    messages: <Array<Message>>[],
    searched_message: "",
  }),

  actions: {
    getSearchedMessage() {
      return this.searched_message;
    },
    setSearchedMessage(message: string) {
      this.searched_message = message;
    },
    async getMpChannels() {
      const userStore = useUserStore();
      const user = userStore.getCurrentUser();
      const res = await getChannelsByUser(user?._id.toString() || "");
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

    async messageServer({
      sender,
      content,
      channel,
      file_url,
      server,
    }: {
      sender: string;
      content: string;
      channel: string;
      file_url: string;
      server: string;
    }) {
      const notifStore = useNotifStore();
      const userStore = useUserStore();
      if (content.includes("@") && content.includes("#")) {
        let contentEdited = content.split("@")[1];
        let username = contentEdited.split("#")[0];
        let tag = "#" + contentEdited.split("#")[1].slice(0, 4);
        const res = await userStore.getUserByName({ username: username, tag: tag });
        if (res.success) {
          emitEvent({
            event: "notif-mention",
            data: { channel: channel, user: res.data._id.toString(), server: server },
          });
          notifStore.createNotif(res.data._id, "mention", channel);
        }
      }

      const res = await sendMessage(sender, content, channel, file_url);
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
      file_url,
    }: {
      sender: string;
      content: string;
      channel: string;
      friend: string;
      file_url: string;
    }) {
      const res = await sendMessage(sender, content, channel, file_url);
      emitEvent({ event: "mp-sent", data: { channel: channel, user: sender, friend: friend } });

      return res;
    },
  },
});
