"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.probe = void 0;
const lodash_1 = require("lodash");
function isDateLike(d) {
    return !!d.toDate;
}
function probe(...props) {
    return async function* probe(g) {
        for await (const item of g) {
            if (typeof (item) != 'object') {
                console.log(item);
            }
            else if (isDateLike(item)) {
                console.log(item.toDate());
            }
            else if (item instanceof Date) {
                console.log(item);
            }
            else if (props.length) {
                console.log(lodash_1.mapValues(lodash_1.pick(item, props)));
            }
            else {
                console.log(lodash_1.mapValues(item));
            }
            yield item;
        }
    };
}
exports.probe = probe;
