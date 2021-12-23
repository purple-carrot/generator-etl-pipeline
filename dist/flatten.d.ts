import { AsyncGeneratorFunc, IterableInput } from './types';
export declare function flatten<T>(): AsyncGeneratorFunc<T | IterableInput<T>, T>;
