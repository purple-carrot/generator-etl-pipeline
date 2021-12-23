"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapProp = void 0;
function mapProp(prop, func) {
    return async function* map(g) {
        let i = 0;
        for await (const item of g) {
            item[prop] = await func(item, i++);
            yield item;
        }
    };
}
exports.mapProp = mapProp;
