import { AsyncGeneratorFunc, ForAwaitOf } from './types'
import { sleep as sleepFunc } from './util/sleep'

export function delay<T>(ms: number, sleep: (ms: number) => Promise<any> = sleepFunc): AsyncGeneratorFunc<T, T> {
  return async function* delay(g: ForAwaitOf<T>) {
    await sleep(ms)
    yield* g
  }
}