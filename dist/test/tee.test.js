"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = require("../from");
const collect_1 = require("../collect");
const tee_1 = require("../tee");
const tap_1 = require("../tap");
const map_1 = require("../map");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
describe('tee', () => {
    it('should work with no parameters', async () => {
        (await collect_1.collect(tee_1.tee()(from_1.from([1, 2, 3, 4])))).should.deep.equal([1, 2, 3, 4]);
    });
    it('should have side-effects', async () => {
        let total = 0;
        (await collect_1.collect(tee_1.tee(tap_1.tap(x => total++))(from_1.from([1, 2, 3, 4])))).should.deep.equal([1, 2, 3, 4]);
        total.should.equal(4);
    });
    it('should tee twice', async () => {
        let s1 = false, s2 = false;
        (await collect_1.collect(tee_1.tee(tap_1.tap(x => s1 = true), tap_1.tap(x => s2 = true))(from_1.from(1)))).should.deep.equal([1]);
        s1.should.be.true;
        s2.should.be.true;
    });
    it('should tee multiple times', async () => {
        let ss = [false, false, false, false];
        (await collect_1.collect(tee_1.tee(tap_1.tap(x => ss[0] = true), tap_1.tap(x => ss[1] = true), tap_1.tap(x => ss[2] = true), tap_1.tap(x => ss[3] = true))(from_1.from(1)))).should.deep.equal([1]);
        ss.every(s => s).should.be.true;
    });
});
describe('teeZip', () => {
    it('should return empty with no input', async () => {
        (await collect_1.collect(tee_1.teeZip()(from_1.from()))).should.deep.equal([]);
    });
    it('should return empty tuples', async () => {
        (await collect_1.collect(tee_1.teeZip()(from_1.from([1, 2, 3, 4])))).should.deep.equal([[], [], [], []]);
    });
    it('should return 1-tuples', async () => {
        (await collect_1.collect(tee_1.teeZip(map_1.map(x => x + 10))(from_1.from([1, 2, 3, 4])))).should.deep.equal([[11], [12], [13], [14]]);
    });
    it('should return 2-tuples', async () => {
        (await collect_1.collect(tee_1.teeZip(map_1.map(x => x + 10), map_1.map(x => x + 20))(from_1.from([1, 2, 3, 4])))).should.deep.equal([[11, 21], [12, 22], [13, 23], [14, 24]]);
    });
    it('should return 4-tuples', async () => {
        (await collect_1.collect(tee_1.teeZip(map_1.map(x => x + 10), map_1.map(x => x + 20), map_1.map(x => x + 30), map_1.map(x => x + 40))(from_1.from([1, 2, 3, 4])))).should.deep.equal([[11, 21, 31, 41], [12, 22, 32, 42], [13, 23, 33, 43], [14, 24, 34, 44]]);
    });
});
