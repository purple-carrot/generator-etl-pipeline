import { ItemFunc, AsyncGeneratorFunc } from './types';
export declare function mapProp<T, U extends T>(prop: string, func: ItemFunc<T, U>): AsyncGeneratorFunc<T, U>;
