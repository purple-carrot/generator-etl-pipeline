import { IterableInput, Producer, Transformer } from './types';
export declare function combine(...gs: IterableInput<any>[]): Producer<any>;
export declare function combineWith<T>(...gs: IterableInput<any>[]): Transformer<T, T | any>;
