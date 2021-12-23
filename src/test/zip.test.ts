import { from } from '../from'
import { collect } from '../collect'
import { zip } from '../zip'

import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('zip', () => {
  it('should return an empty iterator with no input', async () => {
    (await collect(zip()())).should.deep.equal([])
  })

  it('should yield with single input into tuple', async () => {
    (await collect(zip(1)())).should.deep.equal([[1]])
  })

  it('should yield an array of single-tuples', async () => {
    (await collect(zip([1, 2, 3, 4])())).should.deep.equal([[1], [2], [3], [4]])
  })

  it('should yield a single tuple', async () => {
    (await collect(zip([1], [2], [3], [4])())).should.deep.equal([[1, 2, 3, 4]])
  })
})