"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
function map(func) {
    return async function* map(g) {
        let i = 0;
        for await (const item of g) {
            yield await func(item, i++);
        }
    };
}
exports.map = map;
