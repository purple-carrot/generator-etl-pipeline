import { IterableInput, AsyncGeneratorFunc } from './types';
export declare function zip<T1>(g1?: IterableInput<T1>): AsyncGeneratorFunc<null, [T1]>;
export declare function zip<T1, T2>(g1: IterableInput<T1>, g2: IterableInput<T2>): AsyncGeneratorFunc<null, [T1, T2]>;
export declare function zip<T1, T2, T3>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>): AsyncGeneratorFunc<null, [T1, T2, T3]>;
export declare function zip<T1, T2, T3, T4>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>, g4: IterableInput<T4>): AsyncGeneratorFunc<null, [T1, T2, T3, T4]>;
export declare function zip<T1, T2, T3, T4, T5>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>, g4: IterableInput<T4>, g5: IterableInput<T5>): AsyncGeneratorFunc<null, [T1, T2, T3, T4, T5]>;
