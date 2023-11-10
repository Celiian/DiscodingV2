import { io, Socket } from "socket.io-client";
import { useFriendsStore } from "../store/friendsstore";
import { useUserStore } from "../store/userstore";
import { useMessageStore } from "../store/messagestore";
import { useNotifStore } from "../store/notifstore";
const socket: Socket = io("http://localhost:3001");

const notificationSound = new Audio("/src/assets/notif.mp3");

export function emitEvent({ event, data }: { event: string; data: any }) {
  socket.emit(event, data);
}

socket.on("notif", async () => {
  const notifstore = useNotifStore();
  notifstore.getNotifs();

  notificationSound.play();
});

socket.on("notif-mention", async () => {
  const notifstore = useNotifStore();
  notifstore.getNotifs();

  notificationSound.play();
});

socket.on("friend-add", () => {
  const friendsStore = useFriendsStore();

  friendsStore.getFriends();
});

socket.on("mp-ofline", (data) => {
  const notifstore = useNotifStore();
  notifstore.createNotif(data.friend, "mp", data.channel).then(() => {
    socket.emit("notif", { destined_user: data.friend, channel: data.channel });
  });
});

socket.on("notif-msg", (data) => {
  const messagestore = useMessageStore();
  const notifStore = useNotifStore();
  if (data.channel != messagestore.getCurrentChannel()) {
    notificationSound.play();
  }
  notifStore.getNotifs();
});

socket.on("mp-received", (data) => {
  const messagestore = useMessageStore();
  messagestore.getMessagesByChannel(data.channel);
  messagestore.getMpChannels();
});

socket.on("msg-received", (data) => {
  const messagestore = useMessageStore();
  messagestore.getMessagesByChannel(data.channel);
});

export async function connectToServer() {
  const userstore = useUserStore();
  try {
    await socket.connect();
    socket.emit("init-connect", { userId: userstore.getCurrentUser()!._id });

    console.log("Connected to the server");
  } catch (error) {
    console.error("Error connecting to the server:", error);
  }
}

export async function disconnectFromServer() {
  try {
    await socket.disconnect();
    console.log("Disconnected from the server");
  } catch (error) {
    console.error("Error disconnecting from the server:", error);
  }
}
