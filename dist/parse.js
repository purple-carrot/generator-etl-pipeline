"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWhitespaceDelimited = exports.parseTsv = exports.parseDelimited = exports.parseCsv = exports.parseJson = void 0;
const csvParse = require("csv-parse/lib/sync");
const lodash_1 = require("lodash");
function parseJson() {
    return async function* parseJson(g) {
        for await (const item of g) {
            if (!item) {
                continue;
            }
            yield JSON.parse(item);
        }
    };
}
exports.parseJson = parseJson;
function parseCsv() {
    return async function* parseCsv(g) {
        let header = null;
        for await (const headerLine of g) {
            header = csvParse(headerLine, { trim: true })[0];
            break;
        }
        for await (const line of g) {
            if (!line) {
                continue;
            }
            yield lodash_1.zipObject(header, csvParse(line, { trim: true })[0]);
        }
    };
}
exports.parseCsv = parseCsv;
function parseDelimited(delimiter = ',') {
    if (delimiter == ',') {
        return parseCsv();
    }
    return async function* parseDelimited(g) {
        let header = null;
        for await (const headerLine of g) {
            header = headerLine.trim().split(delimiter).map(lodash_1.trim);
            break;
        }
        for await (const item of g) {
            if (!item) {
                continue;
            }
            yield lodash_1.zipObject(header, item.split(delimiter).map(lodash_1.trim));
        }
    };
}
exports.parseDelimited = parseDelimited;
function parseTsv() {
    return parseDelimited('\t');
}
exports.parseTsv = parseTsv;
function parseWhitespaceDelimited() {
    return parseDelimited(/\s+/);
}
exports.parseWhitespaceDelimited = parseWhitespaceDelimited;
