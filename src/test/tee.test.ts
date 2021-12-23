import { from } from '../from'
import { collect } from '../collect'
import { tee, teeZip } from '../tee'
import { tap } from '../tap'
import { map } from '../map'


import * as mocha from 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
chai.should()

describe('tee', () => {
  it('should work with no parameters', async () => {
    (await collect(tee()(from([1,2,3,4])))).should.deep.equal([1,2,3,4])
  })

  it('should have side-effects', async () => {
    let total = 0;
    (await collect(tee(tap(x => total++))(from([1,2,3,4])))).should.deep.equal([1,2,3,4])
    total.should.equal(4)
  })

  it('should tee twice', async () => {
    let s1 = false,
        s2 = false;

    (await collect(tee(tap(x => s1 = true), tap(x => s2 = true))(from(1)))).should.deep.equal([1])
    s1.should.be.true;
    s2.should.be.true
  })

  it('should tee multiple times', async () => {
    let ss = [false, false, false, false];

    (await collect(tee(
                    tap(x => ss[0] = true),
                    tap(x => ss[1] = true),
                    tap(x => ss[2] = true),
                    tap(x => ss[3] = true)
                  )(from(1)))).should.deep.equal([1])
    ss.every(s => s).should.be.true;
  })
})

describe('teeZip', () => {
  it('should return empty with no input', async () => {
    (await collect(teeZip()(from()))).should.deep.equal([])
  })

  it('should return empty tuples', async () => {
    (await collect(teeZip()(from([1,2,3,4])))).should.deep.equal([[],[],[],[]])
  })

  it('should return 1-tuples', async () => {
    (await collect(teeZip(map<number, number>(x => x+10))(from([1,2,3,4])))).should.deep.equal([[11], [12], [13], [14]])
  })

  it('should return 2-tuples', async () => {
    (await collect(teeZip(
                      map<number, number>(x => x+10),
                      map<number, number>(x => x+20)
                  )(from([1,2,3,4])))).should.deep.equal([[11, 21], [12, 22], [13, 23], [14, 24]])
  })

  it('should return 4-tuples', async () => {
    (await collect(teeZip(
                      map<number, number>(x => x+10),
                      map<number, number>(x => x+20),
                      map<number, number>(x => x+30),
                      map<number, number>(x => x+40)
                  )(from([1,2,3,4])))).should.deep.equal([[11, 21, 31, 41], [12, 22, 32, 42], [13, 23, 33, 43], [14, 24, 34, 44]])
  })
})
