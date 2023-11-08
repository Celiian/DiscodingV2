import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001");

export function emitEvent({ event, data }: { event: string; data: any }) {
  socket.emit(event, data);
}

socket.on("event", (data: any) => {
  console.log(data);
});

export async function connectToServer() {
  try {
    await socket.connect();
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
