"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tap = void 0;
function tap(func) {
    return async function* map(g) {
        let i = 0;
        for await (const item of g) {
            await func(item, i++);
            yield item;
        }
    };
}
exports.tap = tap;
