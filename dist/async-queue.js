"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    execute(asyncFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _queue).push((() => __awaiter(this, void 0, void 0, function* () {
                if (__classPrivateFieldGet(this, _queue).length) {
                    yield __classPrivateFieldGet(this, _queue)[__classPrivateFieldGet(this, _queue).length - 1];
                }
                return yield asyncFunc();
            }))());
            return yield __classPrivateFieldGet(this, _queue)[__classPrivateFieldGet(this, _queue).length - 1];
        });
    }
}
exports.AsyncQueue = AsyncQueue;
_queue = new WeakMap();
