import { createReadStream, createWriteStream } from 'fs'
import * as readline from 'readline'
import { promisify } from 'util'
import * as fs from 'fs'
import { AsyncGeneratorFunc, ForAwaitOf } from './types'
import { from } from './from'

const readdir = promisify(fs.readdir)

export async function* fileReadLines(path: string): AsyncGenerator<string> {
  const input = createReadStream(path)

  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    yield line
  }
}

export function fileWriteLines(path: string): AsyncGeneratorFunc<string, string> {
  return async function* fileWriteLines(g: ForAwaitOf<string>) {
    const out = createWriteStream(path)

    for await (const item of g) {
      out.write(item)
      out.write('\n', 'utf8')

      yield item
    }

    out.end()
  }
}

export async function* fileListing(dirPath: string): AsyncGenerator<string> {
  yield* from(await readdir(dirPath))
}