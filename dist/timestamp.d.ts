import { AsyncGeneratorFunc } from './types';
export interface TimestampAsyncGeneratorFunc<T> extends AsyncGeneratorFunc<T, {
    value: T;
    timestamp: number;
}> {
    reset: (startTime?: number) => TimestampAsyncGeneratorFunc<T>;
}
export declare function timestamp<T>(baseTime: number | string): TimestampAsyncGeneratorFunc<T>;
