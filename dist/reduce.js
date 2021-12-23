"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.average = exports.count = exports.max = exports.min = exports.product = exports.sum = exports.reduce = void 0;
function reduce(func, initialValue, onComplete) {
    return async function* accumulate(g) {
        let i = 0;
        let acc = initialValue;
        onComplete = onComplete || (x => x);
        for await (const item of g) {
            acc = func(acc, item, i++);
        }
        yield onComplete(acc);
    };
}
exports.reduce = reduce;
function sum(selector) {
    selector = selector || ((d, i) => +d);
    return reduce((p, d, i) => p + selector(d, i), 0);
}
exports.sum = sum;
function product(selector) {
    selector = selector || ((d, i) => +d);
    return reduce((p, d, i) => p * selector(d, i), 1);
}
exports.product = product;
function min(selector) {
    selector = selector || ((d, i) => +d);
    return reduce((p, d, i) => Math.min(p, selector(d, i) || Infinity), NaN);
}
exports.min = min;
function max(selector) {
    selector = selector || ((d, i) => +d);
    return reduce((p, d, i) => Math.max(p, selector(d, i) || Infinity), NaN);
}
exports.max = max;
function count() {
    return reduce(p => p + 1, 0);
}
exports.count = count;
function average(selector) {
    selector = selector || ((d, i) => +d);
    return reduce((p, d, i) => [p[0] + selector(d, i), p[1] + 1], [0, 0], ([sum, count]) => sum / count);
}
exports.average = average;
