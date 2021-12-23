import { ItemFunc, AsyncGeneratorFunc, ForAwaitOf } from './types'

export function mapProp<T, U extends T>(prop: string, func: ItemFunc<T, U>): AsyncGeneratorFunc<T, U> {
  return async function* map(g: ForAwaitOf<T>) {
    let i = 0
    for await (const item of g) {
      item[prop] = await func(item, i++)
      yield (item as U)
    }
  }
}