"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const callable_1 = require("../util/callable");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
class TestCallable extends callable_1.Callable {
    __call__() {
        return 1;
    }
}
describe('callable', () => {
    it('should call', () => {
        let tc = new TestCallable();
        tc().should.equal(1);
    });
});
