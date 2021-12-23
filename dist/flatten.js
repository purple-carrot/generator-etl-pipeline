"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = void 0;
const from_1 = require("./from");
function flatten() {
    return async function* flatten(g) {
        for await (const item of g) {
            yield* from_1.from(item);
        }
    };
}
exports.flatten = flatten;
