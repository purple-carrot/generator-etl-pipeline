import { AsyncGeneratorFunc } from './types';
export declare function delay<T>(ms: number, sleep?: (ms: number) => Promise<any>): AsyncGeneratorFunc<T, T>;
