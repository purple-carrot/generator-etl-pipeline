import { ForAwaitOf, Consumer } from './types'

export function last<T>(): Consumer<T, T> {
  return async function last(g: ForAwaitOf<T>): Promise<T> {
    let lastItem: T = undefined
    for await (const item of g) {
      lastItem = item
    }
    return lastItem
  }
}
