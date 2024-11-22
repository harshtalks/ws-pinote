import Dockerode from "dockerode";
import { Effect } from "effect";
import { provide } from "../utils";

// Needed to get docker stuff -> need to know why?
export const DOCKER_SOCKET_PATH = "/var/run/docker.sock";

// Injecting Docker service
export class Docker extends Effect.Service<Docker>()("Docker", {
  effect: Effect.sync(
    () =>
      new Dockerode({
        socketPath: DOCKER_SOCKET_PATH,
      }),
  ),
}) {}

// Provide Docker service to a program
export const provideDocker = provide(Docker.Default);
