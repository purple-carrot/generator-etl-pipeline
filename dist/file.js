"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileListing = exports.fileWriteLines = exports.fileReadLines = void 0;
const fs_1 = require("fs");
const readline = require("readline");
const util_1 = require("util");
const fs = require("fs");
const from_1 = require("./from");
const readdir = util_1.promisify(fs.readdir);
async function* fileReadLines(path) {
    const input = fs_1.createReadStream(path);
    const rl = readline.createInterface({
        input: input,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        yield line;
    }
}
exports.fileReadLines = fileReadLines;
function fileWriteLines(path) {
    return async function* fileWriteLines(g) {
        const out = fs_1.createWriteStream(path);
        for await (const item of g) {
            out.write(item);
            out.write('\n', 'utf8');
            yield item;
        }
        out.end();
    };
}
exports.fileWriteLines = fileWriteLines;
async function* fileListing(dirPath) {
    yield* from_1.from(await readdir(dirPath));
}
exports.fileListing = fileListing;
