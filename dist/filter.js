"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.first = exports.take = exports.takeUntil = exports.skipUntil = exports.skip = exports.filter = void 0;
function filter(func) {
    return async function* filter(g) {
        let i = 0;
        for await (const item of g) {
            if (func(item, i)) {
                yield item;
            }
            i++;
        }
    };
}
exports.filter = filter;
function skip(n) {
    return filter((d, i) => i >= n);
}
exports.skip = skip;
function skipUntil(func) {
    let doneSkipping = false;
    return filter((d, i) => {
        doneSkipping = doneSkipping || func(d, i);
        return doneSkipping;
    });
}
exports.skipUntil = skipUntil;
function takeUntil(func) {
    return async function* take(g) {
        let i = 0;
        for await (const item of g) {
            if (await func(item, i)) {
                return;
            }
            i++;
            yield item;
        }
    };
}
exports.takeUntil = takeUntil;
function take(n) {
    return takeUntil((d, i) => i >= n);
}
exports.take = take;
function first() {
    return take(1);
}
exports.first = first;
