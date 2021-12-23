import { SleeperTransformer, Producer } from './types';
export declare function interval(ms: number): Producer<number> & SleeperTransformer<null, number>;
