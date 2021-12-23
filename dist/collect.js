"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = void 0;
async function collect(g) {
    let result = [];
    for await (const item of g) {
        result.push(item);
    }
    return result;
}
exports.collect = collect;
