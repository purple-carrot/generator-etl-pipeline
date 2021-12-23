"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluck = void 0;
const map_1 = require("./map");
const lodash_1 = require("lodash");
exports.pluck = (...props) => map_1.map(d => lodash_1.pick(d, props));
