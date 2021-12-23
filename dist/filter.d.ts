import { ItemFilterFunc, AsyncGeneratorFunc } from './types';
export declare function filter<T>(func: ItemFilterFunc<T>): AsyncGeneratorFunc<T, T>;
export declare function skip<T>(n: number): AsyncGeneratorFunc<T, T>;
export declare function skipUntil<T>(func: ItemFilterFunc<T>): AsyncGeneratorFunc<T, T>;
export declare function takeUntil<T>(func: ItemFilterFunc<T>): AsyncGeneratorFunc<T, T>;
export declare function take<T>(n: number): AsyncGeneratorFunc<T, T>;
export declare function first<T>(): AsyncGeneratorFunc<T, T>;
