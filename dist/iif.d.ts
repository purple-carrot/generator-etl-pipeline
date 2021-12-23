import { AsyncGeneratorFunc } from './types';
export declare function iif<TIn, TOut>(condition: boolean | (() => boolean), gIfTrue: AsyncGeneratorFunc<TIn, TOut>, gIfFalse?: AsyncGeneratorFunc<TIn, TIn | TOut>): AsyncGeneratorFunc<TIn, TIn | TOut>;
