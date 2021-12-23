export declare type ItemFunc<T, U> = (item: T, index: number) => U;
export declare type ItemFilterFunc<T> = (item: T, index: number) => boolean;
export declare type AccumulatorFunc<A, T> = (accumulator: A, item: T, index: number) => A;
export declare type ForAwaitOf<T> = AsyncGenerator<T> | AsyncIterable<T>;
export declare type AsyncGeneratorFunc<TIn, TOut> = (g?: ForAwaitOf<TIn>) => AsyncGenerator<TOut>;
export declare type IterableInput<T> = undefined | T | Iterable<T> | AsyncIterable<T> | Array<T> | Generator<T> | AsyncGenerator<T> | Iterator<T> | AsyncIterator<T>;
export declare type Transformer<T, U> = (g: ForAwaitOf<T>) => AsyncGenerator<U>;
export declare type Producer<T> = () => AsyncGenerator<T>;
export declare type Consumer<T, U> = (g: ForAwaitOf<T>) => Promise<U>;
export interface SleeperTransformer<T, U> extends Transformer<T, U> {
    sleep: (ms: number) => Promise<void>;
}
export interface ResetableTransformer<T, U> extends Transformer<T, U> {
    reset: (startTime: number) => void;
}
