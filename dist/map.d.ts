import { ItemFunc, AsyncGeneratorFunc } from './types';
export declare function map<T, U>(func: ItemFunc<T, U>): AsyncGeneratorFunc<T, U>;
