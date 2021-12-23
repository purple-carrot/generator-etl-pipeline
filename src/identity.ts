import { ItemFunc, AsyncGeneratorFunc, ForAwaitOf } from './types'

export function identity<T>(): AsyncGeneratorFunc<T, T> {
  return async function* identity(g: ForAwaitOf<T>) {
    yield* g
  }
}
