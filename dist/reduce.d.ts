import { AccumulatorFunc, AsyncGeneratorFunc, ItemFunc } from './types';
export declare function reduce<A, T, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A: any) => C)): AsyncGeneratorFunc<T, C>;
export declare function sum<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
export declare function product<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
export declare function min<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
export declare function max<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
export declare function count<T>(): AsyncGeneratorFunc<T, number>;
export declare function average<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
