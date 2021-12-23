import { AsyncGeneratorFunc } from './types';
export declare function fileReadLines(path: string): AsyncGenerator<string>;
export declare function fileWriteLines(path: string): AsyncGeneratorFunc<string, string>;
export declare function fileListing(dirPath: string): AsyncGenerator<string>;
