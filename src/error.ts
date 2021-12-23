import { AsyncGeneratorFunc, ForAwaitOf } from './types'

export function catchError<T>(handler: (e: Error, item: T) => void): AsyncGeneratorFunc<T, T> {
  return async function* catchError(g: ForAwaitOf<T>) {
    for await (const item of g) {
      try {
        yield item
      } catch (e) {
        handler(e, item)
      }
    }
  }
}