import { ItemFilterFunc, Transformer } from './types';
export declare function filter<T>(func: ItemFilterFunc<T>): Transformer<T, T>;
export declare function skip<T>(n: number): Transformer<T, T>;
export declare function skipUntil<T>(func: ItemFilterFunc<T>): Transformer<T, T>;
export declare function takeUntil<T>(func: ItemFilterFunc<T>): Transformer<T, T>;
export declare function take<T>(n: number): Transformer<T, T>;
export declare function first<T>(): Transformer<T, T>;
