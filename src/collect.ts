import { ForAwaitOf } from './types'

export async function collect<T>(g: ForAwaitOf<T>): Promise<T[]> {
  let result = []
  for await (const item of g) {
    result.push(item)
  }

  return result
}