import { AsyncGeneratorFunc, ForAwaitOf } from './types'
import { mapValues, pick } from 'lodash'

// date- like objects can be messy to print raw
type DateLike = {
  toDate: () => Date
}

function isDateLike(d: any): d is DateLike {
  return !!(d as DateLike).toDate
}

export function probe<T>(...props: string[]): AsyncGeneratorFunc<T, T> {
  return async function* probe(g: ForAwaitOf<T>) {
    for await (const item of g) {
      if (typeof(item) != 'object') {
        console.log(item)
      } else if (isDateLike(item)) {
        console.log(item.toDate())
      } else if (item instanceof Date) {
        console.log(item)
      } else if (props.length) {
        console.log(mapValues(pick(item, props)))
      } else {
        console.log(mapValues(item))
      }
      yield item
    }
  }
}