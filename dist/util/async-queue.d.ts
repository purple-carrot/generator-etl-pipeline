export declare class AsyncQueue {
    #private;
    execute<T>(asyncFunc: () => Promise<T>): Promise<T>;
}
