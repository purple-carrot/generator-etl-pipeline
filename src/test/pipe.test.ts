import { from } from '../from'
import { collect } from '../collect'
import { pipe, Pipe } from '../pipe'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('pipe', () => {
  it('should yield nothing with no input', async () => {
    (await collect(pipe())).should.deep.equal([])
  })

  it('should yield single value', async () => {
    (await collect(pipe(1))).should.deep.equal([1])
  })

  it('should yield last non-iterable', async () => {
    (await collect(pipe(1, 2))).should.deep.equal([2])
  })

  function* a() {
    yield* [1,2,3,4]
  }

  it('should yield our from generator', async () => {
    (await collect(pipe(a))).should.deep.equal([1,2,3,4])
  })

  async function* b(g) {
    for await (const item of g) {
      yield item + 10
    }
  }

  it('should connect 2 inputs', async () => {
    (await collect(pipe([1,2,3,4], b))).should.deep.equal([11,12,13,14]);
    (await collect(pipe(a, b))).should.deep.equal([11,12,13,14])
  })

  it('should connect many inputs', async () => {
    (await collect(pipe(a, b, b, b))).should.deep.equal([31,32,33,34])
  })

  it('should be fluent', async () => {
    let p = pipe()
    p.completer(() => true).should.be.an.instanceof(Pipe)
  })

  async function c(g) {
    let i = 0
    for await (const item of g) {
      i++
    }
    return i
  }

  it('should complete', async () => {
    let p = pipe(a)
    p.completer(c);
    (await p()).should.equal(4)
  })

  it('should complete fluently', async () => {
    (await pipe(a).completer(c)()).should.equal(4)
  })

  it('is iterable', async () => {
    let sum = 0
    for await (const item of pipe(a)) {
      sum += item
    }
    sum.should.equal(10)
  })
})