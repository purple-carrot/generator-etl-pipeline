import { ItemFunc, AsyncGeneratorFunc } from './types';
export declare function tap<T>(func: ItemFunc<T, T>): AsyncGeneratorFunc<T, T>;
