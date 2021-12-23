"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.window = void 0;
function window(n) {
    return async function* window(g) {
        let w = [];
        for await (const item of g) {
            w.push(item);
            if (w.length > n) {
                w.shift();
            }
            yield [...w]; // copy array for side-effect safety
        }
    };
}
exports.window = window;
