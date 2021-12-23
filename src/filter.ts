import { ItemFilterFunc, AsyncGeneratorFunc, ForAwaitOf, Transformer } from './types'

export function filter<T>(func: ItemFilterFunc<T>): Transformer<T, T> {
  return async function* filter(g: ForAwaitOf<T>) {
    let i = 0
    for await (const item of g) {
      if (func(item, i)) {
        yield item
      }
      i++
    }
  }
}

export function skip<T>(n: number): Transformer<T, T> {
  return filter((d, i) => i >= n)
}

export function skipUntil<T>(func: ItemFilterFunc<T>): Transformer<T, T> {
  let doneSkipping = false
  return filter((d, i) => {
    doneSkipping = doneSkipping || func(d, i)
    return doneSkipping
  })
}

export function takeUntil<T>(func: ItemFilterFunc<T>): Transformer<T, T> {
  return async function* take(g: ForAwaitOf<T>) {
    let i = 0
    for await (const item of g) {
      if (await func(item, i)) {
        return
      }

      i++
      yield item
    }
  }
}

export function take<T>(n: number): Transformer<T, T> {
  return takeUntil((d, i) => i >= n)
}

export function first<T>(): Transformer<T, T> {
  return take(1)
}