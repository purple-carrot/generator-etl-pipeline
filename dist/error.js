"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
function catchError(handler) {
    return async function* catchError(g) {
        for await (const item of g) {
            try {
                yield item;
            }
            catch (e) {
                handler(e, item);
            }
        }
    };
}
exports.catchError = catchError;
