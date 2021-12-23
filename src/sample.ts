import { sleep as sleepFunc } from './util/sleep'
import { AsyncGeneratorFunc, ForAwaitOf } from './types'

export function sample<T>(ms: number, sleep: (ms: number) => Promise<any> = sleepFunc): AsyncGeneratorFunc<T, T> {
  return async function* sample(g: ForAwaitOf<T>) {
    // TODO
  }
}