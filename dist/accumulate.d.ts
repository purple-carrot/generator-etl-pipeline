import { AccumulatorFunc, AsyncGeneratorFunc } from './types';
export declare function accumulate<A, T>(func: AccumulatorFunc<A, T>, initialValue?: A): AsyncGeneratorFunc<T, A>;
