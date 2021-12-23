"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movingAverage = void 0;
const window_1 = require("./window");
const map_1 = require("./map");
const pipe_1 = require("./pipe");
function movingAverage(n, selector) {
    selector = selector || ((d, i) => +d);
    return async function* movingAverage(g) {
        let p = pipe_1.pipe(g, window_1.window(n), map_1.map((xs) => xs.reduce((a, c, i) => a + selector(c, i), 0) / xs.length));
    };
}
exports.movingAverage = movingAverage;
