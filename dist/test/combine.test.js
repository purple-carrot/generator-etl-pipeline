"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collect_1 = require("../collect");
const combine_1 = require("../combine");
const interval_1 = require("../interval");
const filter_1 = require("../filter");
const delay_1 = require("../delay");
const map_1 = require("../map");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
describe('combine', () => {
    it('completes with no input', async () => {
        (await collect_1.collect(combine_1.combine([], [])())).should.deep.equal([]);
    });
    it('yields simple arrays', async () => {
        (await collect_1.collect(combine_1.combine([1, 1, 1], [1, 1, 1])())).should.deep.equal([1, 1, 1, 1, 1, 1]);
    });
    it('should preserve order of input', async () => {
        (await collect_1.collect(combine_1.combine([1, 2, 3, 4, 5, 6], [8, 8, 8, 8, 8, 8, 8])())).filter(x => x < 8).should.deep.equal([1, 2, 3, 4, 5, 6]);
    });
    it('should handle delays from 1 input', async () => {
        (await collect_1.collect(combine_1.combine(filter_1.take(5)(interval_1.interval(2)()), ['a'])())).should.deep.equal(['a', 0, 1, 2, 3, 4]);
    });
    it('should alternate based on timing of input', async () => {
        (await collect_1.collect(combine_1.combine(delay_1.delay(0)(map_1.map(x => x * 2)(filter_1.take(5)(interval_1.interval(2)()))), delay_1.delay(1)(map_1.map(x => x * 2 + 1)(filter_1.take(5)(interval_1.interval(2)()))))())).should.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
