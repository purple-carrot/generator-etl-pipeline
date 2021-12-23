"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callable = void 0;
class Callable extends Function {
    constructor() {
        super('...args', 'return this.__self__.__call__(...args)');
        var self = this.bind(this);
        this.__self__ = self;
        return self;
    }
}
exports.Callable = Callable;
