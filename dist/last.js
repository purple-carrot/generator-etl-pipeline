"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
function last() {
    return async function last(g) {
        let lastItem = undefined;
        for await (const item of g) {
            lastItem = item;
        }
        return lastItem;
    };
}
exports.last = last;
