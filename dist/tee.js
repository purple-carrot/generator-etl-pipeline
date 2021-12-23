"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teeZip = exports.tee = void 0;
const from_1 = require("./from");
const zip_1 = require("./zip");
const map_1 = require("./map");
// TODO: write out interfaces to keep type parameters
// Need to figure out the return types
// This function isn't an operator because it doesn't return a function*.
// It behaves like identity, but also sends the input into the given generator.
// Warning: both outputs need to be consumed or the queue will stick around resulting in a memory leak.
function teeObject(g, gt) {
    async function* parrot(getItem, id) {
        let item = await getItem(id);
        while (!item.done) {
            yield item.value;
            item = await getItem(id);
        }
    }
    let queue = [[], []];
    let input = from_1.from(g);
    async function getItem(id) {
        if (!queue[id].length) {
            const item = await input.next();
            queue.forEach(q => q.push(item));
        }
        return queue[id].shift();
    }
    return [parrot(getItem, 0), gt(parrot(getItem, 1))];
}
function tee1(gt) {
    return async function* tee1(g) {
        const [g1, g2] = teeObject(g, gt);
        for await (const item of g2) { } // consume the tee'd generator, ignoring the result
        yield* g1;
    };
}
function tee(...gs) {
    return async function* teeGenerator(g) {
        if (gs.length == 0) {
            yield* g;
            return;
        }
        yield* tee(...gs.slice(1))(tee1(gs[0])(g));
    };
}
exports.tee = tee;
function teeZipInternal(...gs) {
    return async function* teeZipGenerator(g) {
        if (gs.length == 0) {
            for await (const item of g) {
                yield [];
            }
            return;
        }
        if (gs.length == 1) {
            yield* map_1.map(x => [x])(gs[0](g));
            return;
        }
        if (gs.length >= 2) {
            let [[source, t1], tRest] = [teeObject(g, gs[0]), teeZipInternal(...gs.slice(1))];
            yield* zip_1.zip(t1, tRest(source))();
            return;
        }
    };
}
function teeZip(...gs) {
    function unpack(tuple) {
        return !tuple.length ? [] : !tuple[1] ? [tuple[0]] : [tuple[0], ...unpack(tuple[1])];
    }
    return async function* teeZip(g) {
        for await (const tuple of teeZipInternal(...gs)(g)) {
            yield unpack(tuple);
        }
    };
}
exports.teeZip = teeZip;
