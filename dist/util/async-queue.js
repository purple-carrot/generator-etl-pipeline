"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _queue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncQueue = void 0;
class AsyncQueue {
    constructor() {
        _queue.set(this, []);
    }
    async execute(asyncFunc) {
        __classPrivateFieldGet(this, _queue).push((async () => {
            if (__classPrivateFieldGet(this, _queue).length) {
                await __classPrivateFieldGet(this, _queue)[__classPrivateFieldGet(this, _queue).length - 1];
            }
            return await asyncFunc();
        })());
        return await __classPrivateFieldGet(this, _queue)[__classPrivateFieldGet(this, _queue).length - 1];
    }
}
exports.AsyncQueue = AsyncQueue;
_queue = new WeakMap();
