import { Callable } from './util/callable';
import { AsyncGeneratorFunc, IterableInput, ItemFunc, AccumulatorFunc, ItemFilterFunc } from './types';
export interface GeneratorChain<T> {
    link<TNext>(g: AsyncGeneratorFunc<T, TNext> | IterableInput<TNext>): GeneratorChain<TNext>;
}
export interface ChainableMethods<T> {
    accumulate<U>(func: AccumulatorFunc<U, T>, initialValue?: U): Chain<U>;
    average(selector?: ItemFunc<T, number>): Chain<number>;
    count(): Chain<number>;
    filter(func: ItemFilterFunc<T>): Chain<T>;
    first(): Chain<T>;
    iif<U>(condition: boolean | (() => boolean), gIfTrue: AsyncGeneratorFunc<T, U>, gIfFalse: AsyncGeneratorFunc<T, T | U>): Chain<T | U>;
    map<U>(func: ItemFunc<T, U>): Chain<U>;
    mapProp<U extends T>(prop: string, func: ItemFunc<T, U>): Chain<U>;
    max(selector?: ItemFunc<T, number>): Chain<number>;
    min(selector?: ItemFunc<T, number>): Chain<number>;
    movingAverage(n: number, selector?: ItemFunc<T, number>): Chain<number>;
    pluck(...props: string[]): Chain<Partial<T>>;
    probe(...props: string[]): Chain<T>;
    product(selector?: ItemFunc<T, number>): Chain<number>;
    reduce<A, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A: any) => C)): Chain<C>;
    skip(n: number): Chain<T>;
    skipUntil(func: ItemFilterFunc<T>): Chain<T>;
    sum(selector?: ItemFunc<T, number>): Chain<number>;
    take(n: number): Chain<T>;
    takeUntil(func: ItemFilterFunc<T>): Chain<T>;
    tap(func: ItemFunc<T, T>): Chain<T>;
    tee(...gs: AsyncGeneratorFunc<T, any>[]): Chain<T>;
    window(n: number): Chain<T[]>;
}
export declare class Chain<T> extends Callable<T> implements AsyncIterable<T>, GeneratorChain<T>, ChainableMethods<T> {
    #private;
    constructor(g: IterableInput<T>);
    link<TNext>(g: AsyncGeneratorFunc<T, TNext> | IterableInput<TNext>): Chain<TNext>;
    completer(_: ((g?: AsyncIterable<T>) => any)): this;
    [Symbol.asyncIterator](): AsyncIterator<T>;
    get iterate(): AsyncIterable<T>;
    __call__(): any;
    accumulate<U>(func: AccumulatorFunc<U, T>, initialValue?: U): Chain<U>;
    average(selector?: ItemFunc<T, number>): Chain<number>;
    count(): Chain<number>;
    filter(func: ItemFilterFunc<T>): Chain<T>;
    first(): Chain<T>;
    iif<U>(condition: boolean | (() => boolean), gIfTrue: AsyncGeneratorFunc<T, U>, gIfFalse: AsyncGeneratorFunc<T, T | U>): Chain<T | U>;
    map<U>(func: ItemFunc<T, U>): Chain<U>;
    mapProp<U extends T>(prop: string, func: ItemFunc<T, U>): Chain<U>;
    max(selector?: ItemFunc<T, number>): Chain<number>;
    min(selector?: ItemFunc<T, number>): Chain<number>;
    movingAverage(n: number, selector?: ItemFunc<T, number>): Chain<number>;
    pluck(...props: string[]): Chain<Partial<T>>;
    probe(...props: string[]): Chain<T>;
    product(selector?: ItemFunc<T, number>): Chain<number>;
    reduce<A, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A: any) => C)): Chain<C>;
    skip(n: number): Chain<T>;
    skipUntil(func: ItemFilterFunc<T>): Chain<T>;
    sum(selector?: ItemFunc<T, number>): Chain<number>;
    take(n: number): Chain<T>;
    takeUntil(func: ItemFilterFunc<T>): Chain<T>;
    tap(func: ItemFunc<T, T>): Chain<T>;
    tee(...gs: AsyncGeneratorFunc<T, any>[]): Chain<T>;
    window(n: number): Chain<T[]>;
}
export declare function chain<T>(g?: IterableInput<T>): Chain<T>;
