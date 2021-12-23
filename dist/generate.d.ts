export declare function generate<T>(init: () => T, check: (T: any) => boolean, increment: (t: any) => T): Generator<T>;
