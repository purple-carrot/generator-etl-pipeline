import { Callable } from '../util/callable'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

class TestCallable extends Callable<any> {
  __call__(): any {
    return 1
  }
}

describe('callable', () => {
  it('should call', () => {
    let tc = new TestCallable()
    tc().should.equal(1)
  })
})