"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
function* repeat(value) {
    while (true) {
        yield value;
    }
}
exports.repeat = repeat;
