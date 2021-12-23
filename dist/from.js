"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
async function* from(obj) {
    if (!arguments.length) {
        return;
    }
    switch (typeof (obj)) {
        case 'undefined':
        case 'boolean':
        case 'number':
        case 'bigint':
        case 'string':
        case 'symbol':
            yield obj;
            return;
        case 'object':
            // falsey values that appear as objects
            if (!obj) {
                yield obj;
                return;
            }
            // Iterator and AsyncIterator
            /*
            if ((obj as Iterator<T>).next) {
              console.log('iterator')
              let item = await (obj as Iterator<T>).next()
              while (!item.done) {
                console.log('i', item)
                yield item.value
                item = await (obj as Iterator<T>).next()
              }
              return
            }
            */
            // anything that works in a for..of
            if (obj.length || obj.length === 0 || obj[Symbol.iterator] || obj[Symbol.asyncIterator]) {
                yield* obj;
                return;
            }
            // plain object, just yield it back out like it's a base type
            yield obj;
            break;
        case 'function':
            yield* from(obj());
            break;
        default:
            throw Error(`Unreachable code? typeof(obj) = ${typeof (obj)}`);
    }
}
exports.from = from;
