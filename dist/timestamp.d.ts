import { ResetableTransformer } from './types';
export declare function timestamp<T>(baseTime: number | string): ResetableTransformer<T, {
    value: T;
    timestamp: number;
}>;
