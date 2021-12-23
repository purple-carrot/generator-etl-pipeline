"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const map_1 = require("./map");
function timestamp(baseTime) {
    baseTime = baseTime == 'now' ? (new Date()).getTime() : (baseTime || 0);
    let result = map_1.map(d => ({
        value: d,
        timestamp: (new Date()).getTime() - baseTime
    }));
    result.reset = startTime => {
        baseTime = startTime || (new Date()).getTime();
    };
    return result;
}
exports.timestamp = timestamp;
