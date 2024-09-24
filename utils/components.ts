/* eslint-disable ts/no-explicit-any */

export type ComponentProps<T> =
  T extends new () => { $props: infer P } ? NonNullable<P> : T extends (props: infer P, ...args: any) => any ? P : unknown

export type ComponentSlots<T> =
  T extends new () => { $slots: infer S } ? NonNullable<S> : T extends (props: any, ctx: { slots: infer S, attrs: any, emit: any }, ...args: any) => any ? NonNullable<S> : unknown

export type ComponentEmit<T> =
  T extends new () => { $emit: infer E } ? NonNullable<E> : T extends (props: any, ctx: { slots: any, attrs: any, emit: infer E }, ...args: any) => any ? NonNullable<E> : unknown
