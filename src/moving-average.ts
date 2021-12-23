import { AsyncGeneratorFunc, ItemFunc, ForAwaitOf } from './types'
import { window } from './window'
import { map } from './map'
import { pipe } from './pipe'

export function movingAverage<T>(n: number, selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return async function* movingAverage(g: ForAwaitOf<T>) {
    let p = pipe(g, window(n), map((xs: T[]) => xs.reduce((a, c, i) => a+selector(c, i), 0) / xs.length))
  }
}