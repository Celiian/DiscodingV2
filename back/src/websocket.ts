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

    client.on("event", (data) => {
      console.log(data);
    });

    client.on("friend-add", (data) => {
      sendMessageToUser(data, "friend-add", "");
    });
  });

  function sendMessageToUser(userId: string, event: string, data: string) {
    if (userId) {
      const connectionId = userConnections.get(userId);
      console.log(userConnections);

      if (connectionId) {
        io.to(connectionId).emit(event, data);
      } else {
        console.log(`User ${userId} is not connected.`);
      }
    }
  }

  return io;
}
