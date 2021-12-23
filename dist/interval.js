"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interval = void 0;
const sleep_1 = require("./util/sleep");
function interval(ms) {
    let result = async function* interval() {
        let i = 0;
        while (true) {
            yield i++;
            await result.sleep(ms);
        }
    };
    result.sleep = sleep_1.sleep;
    return result;
}
exports.interval = interval;
