import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";

export function initSocketio(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin(_, callback) {
        callback(null, true);
      },
    },
  });

  const userConnections = new Map();

  io.on("connection", (client) => {
    client.on("init-connect", (data) => {
      const userId = data.userId;
      const connectionId = client.id;

      userConnections.set(userId, connectionId);

      console.log(`User ${userId} connected with connection ID ${connectionId}`);
    });

    client.on("friend-add", (data) => {
      sendMessageToUser(data, "friend-add", "");
    });

    client.on("notif", (data) => {
      sendMessageToUser(data.destined_user, "notif", data);
    });

    client.on("mp-join", (data) => {
      client.join(data.channel);
    });

    client.on("mp-leave", (data) => {
      client.leave(data.channel);
    });

    client.on("mp-sent", async (data) => {
      const room = data.channel;
      const socketsInRoom = await io.in(room).allSockets();

      if (socketsInRoom.size === 1) {
        io.to(data.channel).emit("mp-received", { channel: data.channel });
        sendMessageToUser(data.user, "mp-ofline", data);
      } else {
        io.to(data.channel).emit("mp-received", { channel: data.channel });
      }
    });
  });

  function sendMessageToUser(userId: string, event: string, data: string) {
    if (userId) {
      const connectionId = userConnections.get(userId);

      if (connectionId) {
        io.to(connectionId).emit(event, data);
      } else {
        console.log(`User ${userId} is not connected.`);
      }
    }
  }

  return io;
}
