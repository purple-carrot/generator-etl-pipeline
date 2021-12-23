import { AsyncGeneratorFunc } from './types';
export declare function throttle<T>(ms: number, sleep?: (ms: number) => Promise<any>): AsyncGeneratorFunc<T, T>;
