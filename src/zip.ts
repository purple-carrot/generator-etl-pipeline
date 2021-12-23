// Error: not all inputs will be of type T. Need to write interfaces that handle differing types, merging them into a tuple type
import { IterableInput, AsyncGeneratorFunc } from './types'
import { from } from './from'
import { empty } from './empty'

export function zip<T1>(g1?: IterableInput<T1>): AsyncGeneratorFunc<null, [T1]>
export function zip<T1, T2>(g1: IterableInput<T1>, g2: IterableInput<T2>): AsyncGeneratorFunc<null, [T1, T2]>
export function zip<T1, T2, T3>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>): AsyncGeneratorFunc<null, [T1, T2, T3]>
export function zip<T1, T2, T3, T4>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>, g4: IterableInput<T4>): AsyncGeneratorFunc<null, [T1, T2, T3, T4]>
export function zip<T1, T2, T3, T4, T5>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>, g4: IterableInput<T4>, g5: IterableInput<T5>): AsyncGeneratorFunc<null, [T1, T2, T3, T4, T5]>
export function zip(...gs: IterableInput<any>[]): AsyncGeneratorFunc<null, any[]> {
  if (!gs.length) {
    return empty
  }

  async function* parrot(getItem: () => Promise<IteratorResult<any>>) {
    let item = await getItem()
    while (!item.done) {
      yield item.value
      item = await getItem()
    }
  }

  gs = gs.map(g => from(g))

  const getItem = () => Promise.all(gs.map(o => o.next()))
                                .then(gs => (({
                                  value: gs. map(g => g.value),
                                  done: gs.some(g => g.done)
                                }) as IteratorResult<any>))

  return async function* zip() {
    yield* parrot(getItem)
  }
}