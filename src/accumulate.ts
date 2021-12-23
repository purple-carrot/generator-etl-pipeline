import { AccumulatorFunc, AsyncGeneratorFunc, ForAwaitOf } from './types'

export function accumulate<A, T>(func: AccumulatorFunc<A, T>, initialValue?: A): AsyncGeneratorFunc<T, A> {
  return async function* accumulate(g: ForAwaitOf<T>) {
    let i = 0
    let acc = initialValue
    for await (const item of g) {
      acc = func(acc, item, i++)
      yield acc
    }
  }
}
