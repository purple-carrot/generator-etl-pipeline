"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function* range(start, stop, increment = 1) {
    for (let i = start; i < stop; i += increment) {
        yield i;
    }
}
exports.range = range;
