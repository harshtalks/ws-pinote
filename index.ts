import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import Docker from "dockerode";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send("Hello from server!");
      },
      onClose: () => {
        console.log("Connection closed");
      },
      onOpen: async (event, ws) => {
        const containers = await docker.listContainers({
          all: true,
        });
        ws.send(containers?.map((el) => el.Names + ": " + el.Id).toString());
      },
    };
  }),
);

export default {
  fetch: app.fetch,
  websocket,
};
