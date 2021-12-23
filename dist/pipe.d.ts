import { Callable } from './util/callable';
export declare class Pipe extends Callable<any> implements AsyncIterable<any> {
    #private;
    private generator;
    constructor(...gs: any[]);
    [Symbol.asyncIterator](): AsyncIterator<any, any, undefined>;
    completer(_: ((g?: AsyncIterable<any>) => any)): this;
    __call__(): any;
}
export declare function pipe(...gs: any[]): Pipe;
