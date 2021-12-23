"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
async function last(g) {
    let last = null;
    for await (const item of g) {
        last = item;
    }
    return last;
}
exports.last = last;
