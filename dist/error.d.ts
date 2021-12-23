import { AsyncGeneratorFunc } from './types';
export declare function catchError<T>(handler: (e: Error, item: T) => void): AsyncGeneratorFunc<T, T>;
