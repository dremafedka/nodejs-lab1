import http from "http";
import { route } from "./router.js";

const connections = new Map();

const server = http.createServer((req, res) => {
  connections.set(res.connection, res);
  route(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("connection", (connection) => {
  console.log("New connection");
  connection.on("close", () => {
    console.log("Close");
    connections.delete(connection);
  });
});

const closeConections = () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection);
    res.end("Server stopped");
    connection.destroy();
  }
};

const showConnections = () => {
  console.log("Connections: ", [...connections.values()].length);
  for (const connection of connections.keys()) {
    const { remoteAddress, remotePort } = connection;
    console.log(` ${remoteAddress}:${remotePort}`);
  }
};

const freeResources = (callback) => {
  console.log("Free resources");
  callback();
};

const gracefulShutdown = (callback) => {
  server.close((error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    freeResources(callback);
  });
  closeConections();
};
process.on("SIGINT", () => {
  showConnections();
  gracefulShutdown(() => {
    showConnections();
    console.log("Server stoped");
    process.exit(0);
  });
});
