export declare abstract class Callable<T> extends Function {
    #private;
    constructor();
    abstract __call__(): T;
}
