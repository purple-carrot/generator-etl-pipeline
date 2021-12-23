"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = require("../from");
const collect_1 = require("../collect");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
describe('from', () => {
    it('should iterate and yield', async () => {
        (await collect_1.collect(from_1.from([1, 2, 3, 4]))).should.deep.equal([1, 2, 3, 4]);
    });
    it('should handle empty input', async () => {
        (await collect_1.collect(from_1.from([]))).should.deep.equal([]);
    });
    it('should yield null', async () => {
        (await collect_1.collect(from_1.from(null))).should.deep.equal([null]);
    });
    it('should yield base types', async () => {
        (await collect_1.collect(from_1.from('string'))).should.deep.equal(['string']);
        (await collect_1.collect(from_1.from(1))).should.deep.equal([1]);
        (await collect_1.collect(from_1.from(true))).should.deep.equal([true]);
        (await collect_1.collect(from_1.from(false))).should.deep.equal([false]);
        (await collect_1.collect(from_1.from({ prop: 1 }))).should.deep.equal([{ prop: 1 }]);
    });
    function* a() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
    it('should yield from generator function', async () => {
        (await collect_1.collect(from_1.from(a))).should.deep.equal([1, 2, 3, 4]);
    });
    it('should yield from iterator object', async () => {
        (await collect_1.collect(from_1.from(a()))).should.deep.equal([1, 2, 3, 4]);
    });
    it('should yield from normal function', async () => {
        (await collect_1.collect(from_1.from(() => "result of function"))).should.deep.equal(["result of function"]);
    });
    it('should yield nothing with no input', async () => {
        (await collect_1.collect(from_1.from())).should.deep.equal([]);
    });
});
