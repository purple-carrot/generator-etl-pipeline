"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accumulate = void 0;
function accumulate(func, initialValue) {
    return async function* accumulate(g) {
        let i = 0;
        let acc = initialValue;
        for await (const item of g) {
            acc = func(acc, item, i++);
            yield acc;
        }
    };
}
exports.accumulate = accumulate;
