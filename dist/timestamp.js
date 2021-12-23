"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
const map_1 = require("./map");
function timestamp(baseTime) {
    baseTime = baseTime == 'now' ? (new Date()).getTime() : (baseTime || 0);
    let timestamp = map_1.map(d => ({
        value: d,
        timestamp: (new Date()).getTime() - baseTime
    }));
    timestamp.reset = startTime => {
        baseTime = startTime || (new Date()).getTime();
        return timestamp;
    };
    return timestamp;
}
exports.timestamp = timestamp;
