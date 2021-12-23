import { AsyncGeneratorFunc, ForAwaitOf } from './types'

export function window<T>(n: number): AsyncGeneratorFunc<T, T[]> {
  return async function* window(g: ForAwaitOf<T>) {
    let w = []
    for await (const item of g) {
      w.push(item)

      if (w.length > n) {
        w.shift()
      }

      yield [...w] // copy array for side-effect safety
    }
  }
}
