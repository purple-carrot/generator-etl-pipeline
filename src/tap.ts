import { ItemFunc, AsyncGeneratorFunc, ForAwaitOf } from './types'

export function tap<T>(func: ItemFunc<T, T>): AsyncGeneratorFunc<T, T> {
  return async function* map(g: ForAwaitOf<T>) {
    let i = 0
    for await (const item of g) {
      await func(item, i++)
      yield item
    }
  }
}