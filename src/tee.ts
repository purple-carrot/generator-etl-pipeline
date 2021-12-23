import { IterableInput, AsyncGeneratorFunc, ForAwaitOf } from './types'
import { from } from './from'
import { zip } from './zip'
import { map } from './map'

// TODO: write out interfaces to keep type parameters
// Need to figure out the return types

// This function isn't an operator because it doesn't return a function*.
// It behaves like identity, but also sends the input into the given generator.
// Warning: both outputs need to be consumed or the queue will stick around resulting in a memory leak.
function teeObject<T, U>(g: IterableInput<T>, gt: AsyncGeneratorFunc<T, U>): [AsyncGenerator<T>, AsyncGenerator<U>] {
  async function* parrot(getItem: (id: number) => Promise<IteratorResult<T>>, id: number): AsyncGenerator<T> {
    let item = await getItem(id)
    while (!item.done) {
      yield item.value
      item = await getItem(id)
    }
  }

  let queue: IteratorResult<T>[][] = [[], []]

  let input = from(g)

  async function getItem(id: number): Promise<IteratorResult<T>> {
    if (!queue[id].length) {
      const item = await input.next()
      queue.forEach(q => q.push(item))
    }

    return queue[id].shift()
  }

  return [parrot(getItem, 0), gt(parrot(getItem, 1))]
}

function tee1<T>(gt: AsyncGeneratorFunc<T, any>): AsyncGeneratorFunc<T, T> {
  return async function* tee1(g: ForAwaitOf<T>) {
    const [g1, g2] = teeObject(g, gt)
    
    for await (const item of g2) { } // consume the tee'd generator, ignoring the result

    yield* g1
  }
}

export function tee<T>(...gs: AsyncGeneratorFunc<T, any>[]): AsyncGeneratorFunc<T, T> {
  return async function* teeGenerator(g: ForAwaitOf<T>) {
    if (gs.length == 0) {
      yield* g
      return
    }

    yield* tee(...gs.slice(1))(tee1(gs[0])(g))
  }
}

function teeZipInternal<T>(...gs: AsyncGeneratorFunc<T, any>[]): AsyncGeneratorFunc<T, any[]> {
  return async function* teeZipGenerator(g: ForAwaitOf<T>) {
    if (gs.length == 0) {
      for await (const item of g) {
        yield []
      }
      return
    }

    if (gs.length == 1) {
      yield* map(x => [x])(gs[0](g))
      return
    }

    if (gs.length >= 2) {
      let [ [ source, t1 ], tRest ] = [ teeObject(g, gs[0]), teeZipInternal(...gs.slice(1)) ]
      yield* zip(t1, tRest(source))()
      return
    }
  }
}

export function teeZip(): AsyncGeneratorFunc<any, []>
export function teeZip<T, U1>(g1: AsyncGeneratorFunc<T, U1>): AsyncGeneratorFunc<T, [U1]>
export function teeZip<T, U1, U2>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>): AsyncGeneratorFunc<T, [U1, U2]>
export function teeZip<T, U1, U2, U3>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>): AsyncGeneratorFunc<T, [U1, U2, U3]>
export function teeZip<T, U1, U2, U3, U4>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>, g4: AsyncGeneratorFunc<T, U4>): AsyncGeneratorFunc<T, [U1, U2, U3, U4]>
export function teeZip<T, U1, U2, U3, U4, U5>(g1: AsyncGeneratorFunc<T, U1>, g2: AsyncGeneratorFunc<T, U2>, g3: AsyncGeneratorFunc<T, U3>, g4: AsyncGeneratorFunc<T, U4>, g5: AsyncGeneratorFunc<T, U5>): AsyncGeneratorFunc<T, [U1, U2, U3, U4, U5]>
export function teeZip<T>(...gs: AsyncGeneratorFunc<T, any>[]): AsyncGeneratorFunc<T, any[]> {
  function unpack(tuple) {
    return !tuple.length ? [] : !tuple[1] ? [ tuple[0] ] : [ tuple[0], ...unpack(tuple[1]) ]
  }

  return async function* teeZip(g: ForAwaitOf<T>) {
    for await (const tuple of teeZipInternal(...gs)(g)) {
      yield unpack(tuple)
    }
  }
}
