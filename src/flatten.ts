import { AsyncGeneratorFunc, ForAwaitOf, IterableInput } from './types'
import { from } from './from'

export function flatten<T>(): AsyncGeneratorFunc<T | IterableInput<T>, T> {
  return async function* flatten(g: ForAwaitOf<T | IterableInput<T>>) {
    for await (const item of g) {
      yield* from(item)
    }
  }
}