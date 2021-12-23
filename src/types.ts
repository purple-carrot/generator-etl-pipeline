import { sleep as sleepFunc } from './util/sleep'

export type ItemFunc<T, U> = (item: T, index: number) => U

export type ItemFilterFunc<T> = (item: T, index: number) => boolean

export type AccumulatorFunc<A, T> = (accumulator: A, item: T, index: number) => A

export type ForAwaitOf<T> = AsyncGenerator<T> | AsyncIterable<T>

export type AsyncGeneratorFunc<TIn, TOut> = (g?: ForAwaitOf<TIn>) => AsyncGenerator<TOut>

export type IterableInput<T> = undefined | T | Iterable<T> | AsyncIterable<T> | Array<T> | Generator<T> | AsyncGenerator<T> | Iterator<T> | AsyncIterator<T>

// new naming of types
export type Transformer<T, U> = (g: ForAwaitOf<T>) => AsyncGenerator<U>

export type Producer<T> = () => AsyncGenerator<T>

export type Consumer<T, U> = (g: ForAwaitOf<T>) => Promise<U>

export interface SleeperTransformer<T, U> extends Transformer<T, U> {
  sleep: (ms: number) => Promise<void>
}

export interface ResetableTransformer<T, U> extends Transformer<T, U> {
  reset: (startTime: number) => void
}