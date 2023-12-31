// friendsStore.ts
import { defineStore } from "pinia";
import { useUserStore } from "./userstore";
import { getFriendsList, addFriendRequest, acceptFriendRequest, rejectFriendRequest } from "./utils/friendsrequest";

export interface Friend {
  _id: string;
  receiver: string;
  initiator: string;
  status: string;
}

export const useFriendsStore = defineStore("friends", {
  state: () => ({
    friends: [],
    pending: [],
    rejected: [],
    displayed: -1,
  }),

  actions: {
    getFriendsOnline(): Friend[] {
      return this.friends;
    },
    getPending(): Friend[] {
      return this.pending;
    },
    getRejected(): Friend[] {
      return this.rejected;
    },
    async getFriends() {
      const userstore = useUserStore();
      const user = userstore.getCurrentUser();
      let res = await getFriendsList(user?._id || "");
      if (res?.success) {
        this.friends = res?.data.friends;
        this.pending = res?.data.pending;
        this.rejected = res?.data.rejected;
      }
    },

    async acceptFriend({ receiver_id, initiator_id }: { receiver_id: string; initiator_id: string }) {
      await acceptFriendRequest({ receiver_id, initiator_id });
      await this.getFriends();
    },

    async rejectFriend({ receiver_id }: { receiver_id: string }) {
      const userstore = useUserStore();
      const user = userstore.getCurrentUser();
      await rejectFriendRequest({ receiver_id, initiator_id: user?._id || "" });
      await this.getFriends();
    },

    async addNewFriend({ receiver_name }: { receiver_name: string }) {
      const userstore = useUserStore();
      const user = userstore.getCurrentUser();
      await addFriendRequest({ receiver_name: receiver_name, initiator_id: user?._id || "" });
      await this.getFriends();
    },

    async setDisplayed(displayed: number) {
      this.displayed = displayed;
    },

    getDisplayed() {
      return this.displayed;
    },
  },
});
