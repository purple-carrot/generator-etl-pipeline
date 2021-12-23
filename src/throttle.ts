import { sleep as sleepFunc } from './util/sleep'
import { AsyncGeneratorFunc, ForAwaitOf } from './types'

export function throttle<T>(ms: number, sleep: (ms: number) => Promise<any> = sleepFunc): AsyncGeneratorFunc<T, T> {
  return async function* throttle(g: ForAwaitOf<T>) {
    let silenced = false
    var sleeper = null

    for await (const item of g) {
      if (!silenced) {
        sleeper = sleep(ms).then(() => silenced = false)
        silenced = true
        yield item
      }
    }
  }
}