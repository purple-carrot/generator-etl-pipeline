"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = void 0;
const sleep_1 = require("./util/sleep");
async function* interval(ms, sleep = sleep_1.sleep) {
    let i = 0;
    while (true) {
        yield i++;
        await sleep(ms);
    }
}
exports.interval = interval;
