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
exports.chain = exports.Chain = void 0;
const callable_1 = require("./util/callable");
const from_1 = require("./from");
const map_1 = require("./map");
const accumulate_1 = require("./accumulate");
const filter_1 = require("./filter");
const iif_1 = require("./iif");
const map_prop_1 = require("./map-prop");
const moving_average_1 = require("./moving-average");
const pluck_1 = require("./pluck");
const probe_1 = require("./probe");
const reduce_1 = require("./reduce");
const tap_1 = require("./tap");
const window_1 = require("./window");
const tee_1 = require("./tee");
class Chain extends callable_1.Callable {
    constructor(g) {
        super();
        _iterator.set(this, void 0);
        _completer.set(this, async (g) => {
            for await (const item of g) { }
        });
        __classPrivateFieldSet(this, _iterator, from_1.from(g));
    }
    link(g) {
        if (typeof (g) == 'function') {
            return new Chain(g(this));
        }
        return new Chain(g);
    }
    completer(_) {
        __classPrivateFieldSet(this, _completer, _);
        return this;
    }
    [(_iterator = new WeakMap(), _completer = new WeakMap(), Symbol.asyncIterator)]() {
        return __classPrivateFieldGet(this, _iterator);
    }
    get iterate() {
        return this;
    }
    __call__() {
        return __classPrivateFieldGet(this, _completer).call(this, from_1.from(__classPrivateFieldGet(this, _iterator)));
    }
    // #region ChainableMethods
    accumulate(func, initialValue) {
        return this.link(accumulate_1.accumulate(func, initialValue));
    }
    average(selector) {
        return this.link(reduce_1.average(selector));
    }
    count() {
        return this.link(reduce_1.count());
    }
    filter(func) {
        return this.link(filter_1.filter(func));
    }
    first() {
        return this.link(filter_1.first());
    }
    iif(condition, gIfTrue, gIfFalse) {
        return this.link(iif_1.iif(condition, gIfTrue, gIfFalse));
    }
    map(func) {
        return this.link(map_1.map(func));
    }
    mapProp(prop, func) {
        return this.link(map_prop_1.mapProp(prop, func));
    }
    max(selector) {
        return this.link(reduce_1.max(selector));
    }
    min(selector) {
        return this.link(reduce_1.min(selector));
    }
    movingAverage(n, selector) {
        return this.link(moving_average_1.movingAverage(n, selector));
    }
    pluck(...props) {
        return this.link(pluck_1.pluck(...props));
    }
    probe(...props) {
        return this.link(probe_1.probe(...props));
    }
    product(selector) {
        return this.link(reduce_1.product(selector));
    }
    reduce(func, initialValue, onComplete) {
        return this.link(reduce_1.reduce(func, initialValue, onComplete));
    }
    skip(n) {
        return this.link(filter_1.skip(n));
    }
    skipUntil(func) {
        return this.link(filter_1.skipUntil(func));
    }
    sum(selector) {
        return this.link(reduce_1.sum(selector));
    }
    take(n) {
        return this.link(filter_1.take(n));
    }
    takeUntil(func) {
        return this.link(filter_1.takeUntil(func));
    }
    tap(func) {
        return this.link(tap_1.tap(func));
    }
    tee(...gs) {
        return this.link(tee_1.tee(...gs));
    }
    window(n) {
        return this.link(window_1.window(n));
    }
}
exports.Chain = Chain;
function chain(g) {
    return new Chain(g || from_1.from());
}
exports.chain = chain;
// Example of extending the chain object, this would be in another file.
// However, typescript can't infere the types used, so this isn't preferred to simply putting methods in Chain directly
/*
declare module './chain' {
  interface Chain<T> {
    map<T, U>(func: ItemFunc<T, U>): Chain<U>
  }
}

function mapChain<T, U>(this: Chain<T>, func: ItemFunc<T, U>): Chain<U> {
  return this.link(map(func))
}

Chain.prototype.map = mapChain
*/ 
