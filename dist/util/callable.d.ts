export declare abstract class Callable<T> extends Function {
    __self__: Function;
    constructor();
    abstract __call__(): T;
}
