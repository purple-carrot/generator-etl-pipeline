import { AsyncGeneratorFunc, ItemFunc } from './types';
export declare function movingAverage<T>(n: number, selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number>;
