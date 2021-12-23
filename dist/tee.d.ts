import { AsyncGeneratorFunc } from './types';
export declare function tee<T>(...gs: AsyncGeneratorFunc<T, any>[]): AsyncGeneratorFunc<T, T>;
export declare function teeZip(): AsyncGeneratorFunc<any, []>;
export declare function teeZip<T, U1>(g1: AsyncGeneratorFunc<T, U1>): AsyncGeneratorFunc<T, [U1]>;
export declare function teeZip<T, U1, U2>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>): AsyncGeneratorFunc<T, [U1, U2]>;
export declare function teeZip<T, U1, U2, U3>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>): AsyncGeneratorFunc<T, [U1, U2, U3]>;
export declare function teeZip<T, U1, U2, U3, U4>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>, g4: AsyncGeneratorFunc<T, U4>): AsyncGeneratorFunc<T, [U1, U2, U3, U4]>;
export declare function teeZip<T, U1, U2, U3, U4, U5>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>, g4: AsyncGeneratorFunc<T, U4>, g5: AsyncGeneratorFunc<T, U5>): AsyncGeneratorFunc<T, [U1, U2, U3, U4, U5]>;
