"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyTsv = exports.stringifyCsv = exports.stringifyDelimited = exports.stringifyJson = void 0;
const lodash_1 = require("lodash");
function stringifyJson() {
    return async function* stringifyJson(g) {
        for await (const item of g) {
            yield JSON.stringify(item);
        }
    };
}
exports.stringifyJson = stringifyJson;
function stringifyDelimited(delimiter = ',', header) {
    return async function* stringifyDelimited(g) {
        let first = null;
        for await (const firstItem of g) {
            first = firstItem;
            break;
        }
        if (!first) {
            return;
        }
        header = header || lodash_1.keys(first);
        yield header.join(delimiter);
        yield header.map(h => first[h]).join(delimiter);
        for await (const item of g) {
            yield header.map(h => { var _a; return item[h] && item[h].indexOf(delimiter) >= 0 ? `"${item[h]}"` : (_a = item[h]) === null || _a === void 0 ? void 0 : _a.toString(); }).join(delimiter).replace('\n', ' ');
        }
    };
}
exports.stringifyDelimited = stringifyDelimited;
function stringifyCsv(header) {
    return stringifyDelimited(',', header);
}
exports.stringifyCsv = stringifyCsv;
function stringifyTsv(header) {
    return stringifyDelimited('\t', header);
}
exports.stringifyTsv = stringifyTsv;
