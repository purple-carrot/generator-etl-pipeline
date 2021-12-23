import { AsyncGeneratorFunc, ForAwaitOf } from './types'
import * as csvParse from 'csv-parse/lib/sync'
import { zipObject, trim } from 'lodash'

export function parseJson(): AsyncGeneratorFunc<string, object> {
  return async function* parseJson(g: ForAwaitOf<string>) {
    for await (const item of g) {
      if (!item) {
        continue
      }
      yield JSON.parse(item)
    }
  }
}

export function parseCsv(): AsyncGeneratorFunc<string, object> {
  return async function* parseCsv(g: ForAwaitOf<string>) {
    let header: string[] = null
    for await (const headerLine of g) {
      header = csvParse(headerLine, { trim: true })[0]
      break
    }

    for await (const line of g) {
      if (!line) {
        continue
      }
      yield zipObject(header, csvParse(line, { trim: true })[0])
    }
  }
}

export function parseDelimited(delimiter: string | RegExp = ','): AsyncGeneratorFunc<string, object> {
  if (delimiter == ',') {
    return parseCsv()
  }

  return async function* parseDelimited(g: ForAwaitOf<string>) {
    let header: string[] = null
    for await (const headerLine of g) {
      header = headerLine.trim().split(delimiter).map(trim)
      break
    }

    for await (const item of g) {
      if (!item) {
        continue
      }
      yield zipObject(header, item.split(delimiter).map(trim))
    }
  }
}

export function parseTsv(): AsyncGeneratorFunc<string, object> {
  return parseDelimited('\t')
}

export function parseWhitespaceDelimited(): AsyncGeneratorFunc<string, object> {
  return parseDelimited(/\s+/)
}
