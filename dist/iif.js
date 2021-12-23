"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iif = void 0;
const identity_1 = require("./identity");
function iif(condition, gIfTrue, gIfFalse = identity_1.identity()) {
    let conditionResult = typeof (condition) == 'function' ? condition() : condition;
    return conditionResult ? gIfTrue : gIfFalse;
}
exports.iif = iif;
