"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const from_1 = require("./from");
const empty_1 = require("./empty");
function zip(...gs) {
    if (!gs.length) {
        return empty_1.empty;
    }
    async function* parrot(getItem) {
        let item = await getItem();
        while (!item.done) {
            yield item.value;
            item = await getItem();
        }
    }
    gs = gs.map(g => from_1.from(g));
    const getItem = () => Promise.all(gs.map(o => o.next()))
        .then(gs => ({
        value: gs.map(g => g.value),
        done: gs.some(g => g.done)
    }));
    return async function* zip() {
        yield* parrot(getItem);
    };
}
exports.zip = zip;
