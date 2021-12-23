"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
function* generate(init, check, increment) {
    let counter = init();
    while (check(counter)) {
        yield counter;
        counter = increment(counter);
    }
}
exports.generate = generate;
