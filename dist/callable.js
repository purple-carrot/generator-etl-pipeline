"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _self;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callable = void 0;
class Callable extends Function {
    constructor() {
        super('...args', 'return this.__self__.__call__(...args)');
        _self.set(this, void 0);
        var self = this.bind(this);
        __classPrivateFieldSet(this, _self, self);
        return self;
    }
}
exports.Callable = Callable;
_self = new WeakMap();
