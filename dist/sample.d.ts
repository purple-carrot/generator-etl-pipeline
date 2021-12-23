import { AsyncGeneratorFunc } from './types';
export declare function sample<T>(ms: number, sleep?: (ms: number) => Promise<any>): AsyncGeneratorFunc<T, T>;
