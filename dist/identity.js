"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = void 0;
function identity() {
    return async function* identity(g) {
        yield* g;
    };
}
exports.identity = identity;
