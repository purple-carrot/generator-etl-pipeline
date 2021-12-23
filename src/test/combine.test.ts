import { from } from '../from'
import { collect } from '../collect'
import { combine } from '../combine'
import { interval } from '../interval'
import { take } from '../filter'
import { delay } from '../delay'
import { map } from '../map'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('combine', () => {
  it('completes with no input', async () => {
    (await collect(combine([], [])())).should.deep.equal([])
  })

  it('yields simple arrays', async () => {
    (await collect(combine([1,1,1], [1,1,1])())).should.deep.equal([1,1,1,1,1,1])
  })

  it('should preserve order of input', async () => {
    (await collect(combine([1,2,3,4,5,6], [8,8,8,8,8,8,8])())).filter(x => x < 8).should.deep.equal([1,2,3,4,5,6])
  })

  it('should handle delays from 1 input', async () => {
    (await collect(combine(take(5)(interval(2)()), ['a'])())).should.deep.equal(['a', 0,1,2,3,4])
  })

  it('should alternate based on timing of input', async () => {
    (await collect(combine(
        delay(0)(map<number, number>(x => x*2)(take<number>(5)(interval(2)()))),
        delay(1)(map<number, number>(x => x*2+1)(take<number>(5)(interval(2)())))
      )())).should.deep.equal([0,1,2,3,4,5,6,7,8,9])
  })
})
