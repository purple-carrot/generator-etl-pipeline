import { from } from '../from'
import { collect } from '../collect'
import { chain, Chain } from '../chain'
import { map } from '../map'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('chain', () => {
  it('should yield nothing with no input', async () => {
    (await collect(chain())).should.deep.equal([])
  })

  it('should yield single value', async () => {
    (await collect(chain(1))).should.deep.equal([1])
  })

  it('should yield last non-iterable', async () => {
    (await collect(chain(1).link(2))).should.deep.equal([2])
  })

  function* a() {
    yield* [1,2,3,4]
  }

  it('should yield our from generator', async () => {
    (await collect(chain(a))).should.deep.equal([1,2,3,4])
  })

  async function* b(g) {
    for await (const item of g) {
      yield item + 10
    }
  }

  it('should connect 2 inputs', async () => {
    (await collect(chain([1,2,3,4]).link(b))).should.deep.equal([11,12,13,14]);
    (await collect(chain(a).link(b))).should.deep.equal([11,12,13,14])
  })

  it('should connect many inputs', async () => {
    (await collect(chain(a).link(b).link(b).link(b))).should.deep.equal([31,32,33,34])
  })

  it('should be fluent', async () => {
    let c = chain()
    c.completer(() => true).should.be.an.instanceof(Chain)
  })

  async function c(g) {
    let i = 0
    for await (const item of g) {
      i++
    }
    return i
  }

  it('should complete', async () => {
    let ch = chain(a)
    ch.completer(c);
    (await ch()).should.equal(4)
  })

  it('should complete fluently', async () => {
    (await chain(a).completer(c)()).should.equal(4)
  })

  it('is iterable', async () => {
    let sum = 0
    for await (const item of chain(a())) {
      sum += item
    }
    sum.should.equal(10)
  })

  it('links a generator function', async () => {
    (await collect(chain(a()).link(map(x => x+10)))).should.deep.equal([11,12,13,14])
  })

  it('links a generator function through extension method', async () => {
    (await collect(chain(a()).map(x => x+10)))
  })
})