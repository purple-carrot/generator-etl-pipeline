import { IterableInput, AsyncGeneratorFunc, ForAwaitOf, Producer, Transformer } from './types'
import { from } from './from'

//export function combine<T, U>(g1: IterableInput<T>, g2: IterableInput<U>): AsyncGeneratorFunc<null, T | U> {
//export function combine(): AsyncGeneratorFunc<null, void>
//export function combine<T1>(g1: IterableInput<T1>): AsyncGeneratorFunc<null, T1>
//export function combine<T1, T2>(g1: IterableInput<T1>, g2: IterableInput<T2>): AsyncGeneratorFunc<null, T1 | T2>
//export function combine<T1, T2, T3>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>): AsyncGeneratorFunc<null, T1 | T2 | T3>
//export function combine<T1, T2, T3, T4>(g1: IterableInput<T1>, g2: IterableInput<T2>, g3: IterableInput<T3>, g4: IterableInput<T4>): AsyncGeneratorFunc<null, T1 | T2 | T3 | T4>
export function combine(...gs: IterableInput<any>[]): Producer<any> {
  return async function* combine() {
    let inputs = gs.map(from),
        dones = gs.map(() => false),
        queue = []

    function getItem(ir: IteratorResult<any>, id: number) {
      if (ir.done) {
        dones[id] = true
      } else {
        queue.push(ir.value)
      }
    }

    while (!dones.every(d => d)) {
      await Promise.race(inputs.map((g, i) => g.next().then(ir => getItem(ir, i))).filter((g, i) => !dones[i]))

      if (queue.length) {
        yield queue.shift()
      }
    }

    yield* queue
  }
}

export function combineWith<T>(...gs: IterableInput<any>[]): Transformer<T, T | any> {
  return async function* combineWith(g: ForAwaitOf<T>) {
    yield* combine(g, ...gs)()
  }
}