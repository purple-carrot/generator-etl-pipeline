"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _iterator, _completer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = exports.Pipe = void 0;
const callable_1 = require("./util/callable");
const from_1 = require("./from");
class Pipe extends callable_1.Callable {
    constructor(...gs) {
        super();
        _iterator.set(this, void 0);
        _completer.set(this, async (g) => {
            for await (const item of g) { }
        });
        __classPrivateFieldSet(this, _iterator, this.generator(...gs));
    }
    generator(...gs) {
        if (!gs.length) {
            return from_1.from();
        }
        if (gs.length == 1) {
            return from_1.from(gs[0]);
        }
        const [first, next, rest] = [gs[0], gs[1], gs.slice(2)];
        if (typeof (next) != 'function') {
            return this.generator(next, ...rest);
        }
        return this.generator(next(from_1.from(first)), ...rest);
    }
    [(_iterator = new WeakMap(), _completer = new WeakMap(), Symbol.asyncIterator)]() {
        return __classPrivateFieldGet(this, _iterator);
    }
    completer(_) {
        __classPrivateFieldSet(this, _completer, _);
        return this;
    }
    __call__() {
        return __classPrivateFieldGet(this, _completer).call(this, from_1.from(__classPrivateFieldGet(this, _iterator)));
    }
}
exports.Pipe = Pipe;
function pipe(...gs) {
    return new Pipe(...gs);
}
exports.pipe = pipe;
