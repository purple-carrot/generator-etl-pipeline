"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const sleep_1 = require("./util/sleep");
function delay(ms, sleep = sleep_1.sleep) {
    return async function* delay(g) {
        await sleep(ms);
        yield* g;
    };
}
exports.delay = delay;
