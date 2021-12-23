import { from } from '../from'
import { collect } from '../collect'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('from', () => {
  it('should iterate and yield', async () => {
    (await collect(from([1,2,3,4]))).should.deep.equal([1,2,3,4])
  })

  it('should handle empty input', async () => {
    (await collect(from([]))).should.deep.equal([])
  })

  it('should yield null', async () => {
    (await collect(from(null))).should.deep.equal([null])
  })

  it('should yield base types', async () => {
    (await collect(from('string'))).should.deep.equal(['string']);
    (await collect(from(1))).should.deep.equal([1]);
    (await collect(from(true))).should.deep.equal([true]);
    (await collect(from(false))).should.deep.equal([false]);
    (await collect(from({ prop: 1 }))).should.deep.equal([{ prop: 1 }]);
  })

  function* a() {
    yield 1
    yield 2
    yield 3
    yield 4
  }

  it('should yield from generator function', async () => {
    (await collect(from(a))).should.deep.equal([1,2,3,4])
  })

  it('should yield from iterator object', async () => {
    (await collect(from(a()))).should.deep.equal([1,2,3,4])
  })

  it('should yield from normal function', async () => {
    (await collect(from(() => "result of function"))).should.deep.equal(["result of function"])
  })

  it('should yield nothing with no input', async () => {
    (await collect(from())).should.deep.equal([])
  })
})