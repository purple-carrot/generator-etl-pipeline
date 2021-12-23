"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collect_1 = require("../collect");
const zip_1 = require("../zip");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
describe('zip', () => {
    it('should return an empty iterator with no input', async () => {
        (await collect_1.collect(zip_1.zip()())).should.deep.equal([]);
    });
    it('should yield with single input into tuple', async () => {
        (await collect_1.collect(zip_1.zip(1)())).should.deep.equal([[1]]);
    });
    it('should yield an array of single-tuples', async () => {
        (await collect_1.collect(zip_1.zip([1, 2, 3, 4])())).should.deep.equal([[1], [2], [3], [4]]);
    });
    it('should yield a single tuple', async () => {
        (await collect_1.collect(zip_1.zip([1], [2], [3], [4])())).should.deep.equal([[1, 2, 3, 4]]);
    });
});
