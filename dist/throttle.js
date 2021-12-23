"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const sleep_1 = require("./util/sleep");
function throttle(ms, sleep = sleep_1.sleep) {
    return async function* throttle(g) {
        let silenced = false;
        var sleeper = null;
        for await (const item of g) {
            if (!silenced) {
                sleeper = sleep(ms).then(() => silenced = false);
                silenced = true;
                yield item;
            }
        }
    };
}
exports.throttle = throttle;
