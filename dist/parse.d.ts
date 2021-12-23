import { AsyncGeneratorFunc } from './types';
export declare function parseJson(): AsyncGeneratorFunc<string, object>;
export declare function parseCsv(): AsyncGeneratorFunc<string, object>;
export declare function parseDelimited(delimiter?: string | RegExp): AsyncGeneratorFunc<string, object>;
export declare function parseTsv(): AsyncGeneratorFunc<string, object>;
export declare function parseWhitespaceDelimited(): AsyncGeneratorFunc<string, object>;
