import { AsyncGeneratorFunc, ForAwaitOf } from './types'
import { keys } from 'lodash'

export function stringifyJson<T>(): AsyncGeneratorFunc<T, string> {
  return async function* stringifyJson(g: ForAwaitOf<T>) {
    for await (const item of g) {
      yield JSON.stringify(item)
    }
  }
}

export function stringifyDelimited<T>(delimiter = ',', header?: string[]): AsyncGeneratorFunc<T, string> {
  return async function* stringifyDelimited(g: ForAwaitOf<T>) {
    let first: T = null
    for await (const firstItem of g) {
      first = firstItem
      break
    }
   
    if (!first) {
      return
    }

    header = header || keys(first)
    yield header.join(delimiter)

    yield header.map(h => first[h]).join(delimiter)

    for await (const item of g) {
      yield header.map(h => item[h] && item[h].indexOf(delimiter) >= 0 ? `"${item[h]}"` : item[h]?.toString()).join(delimiter).replace('\n', ' ')
    }
  }
}

export function stringifyCsv(header?: string[]) {
  return stringifyDelimited(',', header)
}

export function stringifyTsv(header?: string[]) {
  return stringifyDelimited('\t', header)
}