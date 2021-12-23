import { IterableInput, AsyncGeneratorFunc } from './types';
export declare function combine(...gs: IterableInput<any>[]): AsyncGeneratorFunc<null, any>;
export declare function combineWith<T>(...gs: IterableInput<any>[]): AsyncGeneratorFunc<T, T | any>;
