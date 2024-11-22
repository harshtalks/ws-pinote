import { Effect, type Layer } from "effect";

// wrapper function to provide a service to an effect
export const provide =
  <S>(service: Layer.Layer<S>) =>
  <A, E, R>(
    self: Effect.Effect<A, E, R | S>,
  ): Effect.Effect<A, E, Exclude<R, S>> =>
    Effect.provide(self, service);
