import { IterableInput } from './types'

export async function* from<T>(obj?: IterableInput<T>): AsyncGenerator<T> {
  if (!arguments.length) {
    return
  }

  switch (typeof(obj)) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'string':
    case 'symbol':
      yield (obj as T)
      return

    case 'object':
      // falsey values that appear as objects
      if (!obj) {
        yield (obj as T)
        return
      }

      // Iterator and AsyncIterator
      /*
      if ((obj as Iterator<T>).next) {
        console.log('iterator')
        let item = await (obj as Iterator<T>).next()
        while (!item.done) {
          console.log('i', item)
          yield item.value
          item = await (obj as Iterator<T>).next()
        }
        return
      }
      */

      // anything that works in a for..of
      if ((obj as Array<T>).length || (obj as Array<T>).length === 0 || (obj as Iterable<T>)[Symbol.iterator] || (obj as AsyncIterable<T>)[Symbol.asyncIterator]) {
        yield* (obj as AsyncGenerator<T>)
        return
      }

      // plain object, just yield it back out like it's a base type
      yield (obj as T)

      break

    case 'function':
      yield* (from(obj()) as AsyncGenerator<T>)

      break

    default:
      throw Error(`Unreachable code? typeof(obj) = ${typeof(obj)}`)
  }
}