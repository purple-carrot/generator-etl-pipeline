import { AccumulatorFunc, AsyncGeneratorFunc, ItemFunc, ForAwaitOf } from './types'

export function reduce<A, T, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A) => C)): AsyncGeneratorFunc<T, C> {
  return async function* accumulate(g: ForAwaitOf<T>) {
    let i = 0
    let acc = initialValue
    onComplete = onComplete || (x => x)
    for await (const item of g) {
      acc = func(acc, item, i++)
    }
    yield onComplete(acc)
  }
}

export function sum<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return reduce((p, d, i) => p + selector(d, i), 0)
}

export function product<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return reduce((p, d, i) => p * selector(d, i), 1)
}

export function min<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return reduce((p, d, i) => Math.min(p, selector(d, i) || Infinity), NaN)
}

export function max<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return reduce((p, d, i) => Math.max(p, selector(d, i) || Infinity), NaN)
}

export function count<T>(): AsyncGeneratorFunc<T, number> {
  return reduce(p => p + 1, 0)
}

export function average<T>(selector?: ItemFunc<T, number>): AsyncGeneratorFunc<T, number> {
  selector = selector || ((d, i) => +d)
  return reduce((p, d, i) => [p[0]+selector(d, i), p[1]+1], [0, 0], ([sum, count]) => sum/count)
}
