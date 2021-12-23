import { sleep as sleepFunc } from './util/sleep'
import { SleeperTransformer, Producer } from './types'

export function interval(ms: number): Producer<number> & SleeperTransformer<null, number> {
  let result: any = async function* interval() {
    let i = 0
    while (true) {
      yield i++
      await result.sleep(ms)
    }
  }

  result.sleep = sleepFunc

  return result
}
