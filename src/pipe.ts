import { Callable } from './util/callable'
import { from } from './from'

export class Pipe extends Callable<any> implements AsyncIterable<any> {
  private generator(...gs: any[]): AsyncIterator<any> {
    if (!gs.length) {
      return from()
    }

    if (gs.length == 1) {
      return from(gs[0])
    }

    const [ first, next, rest ] = [ gs[0], gs[1], gs.slice(2) ]

    if (typeof(next) != 'function') {
      return this.generator(next, ...rest)
    }

    return this.generator(next(from(first)), ...rest)
  }

  #iterator: AsyncIterator<any>

  #completer: ((g?: AsyncIterable<any>) => any) = async g => {
    for await (const item of g) { }
  }

  constructor(...gs: any[]) {
    super()
    this.#iterator = this.generator(...gs)
  }

  [Symbol.asyncIterator]() {
    return this.#iterator
  }

  completer(_: ((g?: AsyncIterable<any>) => any)): this {
    this.#completer = _
    return this
  }

  __call__(): any {
    return this.#completer(from(this.#iterator))
  }
}

export function pipe(...gs: any[]): Pipe {
  return new Pipe(...gs)
}