import { io, Socket } from "socket.io-client";
import { useFriendsStore } from "../store/friendsstore";
import { useUserStore } from "../store/userstore";
import { useMessageStore } from "../store/messageStore";
const socket: Socket = io("http://localhost:3001");

export function emitEvent({ event, data }: { event: string; data: any }) {
  socket.emit(event, data);
}

socket.on("event", (data: any) => {
  console.log(data);
});

socket.on("friend-add", () => {
  const friendsStore = useFriendsStore();

  friendsStore.getFriends();
});

socket.on("mp-received", (data) => {
  const messageStore = useMessageStore();

  messageStore.getMessagesMp(data.channel);
});

export async function connectToServer() {
  const userstore = useUserStore();
  try {
    await socket.connect();
    socket.emit("init-connect", { userId: userstore.getCurrentUser()._id });

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
