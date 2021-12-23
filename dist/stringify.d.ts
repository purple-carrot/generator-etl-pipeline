import { AsyncGeneratorFunc } from './types';
export declare function stringifyJson<T>(): AsyncGeneratorFunc<T, string>;
export declare function stringifyDelimited<T>(delimiter?: string, header?: string[]): AsyncGeneratorFunc<T, string>;
export declare function stringifyCsv(header?: string[]): AsyncGeneratorFunc<unknown, string>;
export declare function stringifyTsv(header?: string[]): AsyncGeneratorFunc<unknown, string>;
