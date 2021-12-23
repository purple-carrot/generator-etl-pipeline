import { ItemFunc, AsyncGeneratorFunc, ForAwaitOf } from './types'

export function map<T, U>(func: ItemFunc<T, U>): AsyncGeneratorFunc<T, U> {
  return async function* map(g: ForAwaitOf<T>) {
    let i = 0
    for await (const item of g) {
      yield await func(item, i++)
    }
  }
}