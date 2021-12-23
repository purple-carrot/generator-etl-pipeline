import { Callable } from './util/callable'
import { from } from './from'
import { AsyncGeneratorFunc, IterableInput, ItemFunc, AccumulatorFunc, ItemFilterFunc } from './types'
import { map } from './map'
import { accumulate } from './accumulate'
import { filter, skip, skipUntil, take, takeUntil, first } from './filter'
import { iif } from './iif'
import { mapProp } from './map-prop'
import { movingAverage } from './moving-average'
import { pluck } from './pluck'
import { probe } from './probe'
import { reduce, sum, product, min, max, count, average } from './reduce'
import { tap } from './tap'
import { window } from './window'
import { tee, teeZip } from './tee'

export interface GeneratorChain<T> {
  link<TNext>(g: AsyncGeneratorFunc<T, TNext> | IterableInput<TNext>): GeneratorChain<TNext>
}

export interface ChainableMethods<T> {
  accumulate<U>(func: AccumulatorFunc<U, T>, initialValue?: U): Chain<U>
  average(selector?: ItemFunc<T, number>): Chain<number>
  count(): Chain<number>
  filter(func: ItemFilterFunc<T>): Chain<T>
  first(): Chain<T>
  iif<U>(condition: boolean | (() => boolean), gIfTrue: AsyncGeneratorFunc<T, U>, gIfFalse: AsyncGeneratorFunc<T, T | U>): Chain<T | U>
  map<U>(func: ItemFunc<T, U>): Chain<U>
  mapProp<U extends T>(prop: string, func: ItemFunc<T, U>): Chain<U> 
  max(selector?: ItemFunc<T, number>): Chain<number>
  min(selector?: ItemFunc<T, number>): Chain<number>
  movingAverage(n: number, selector?: ItemFunc<T, number>): Chain<number>
  pluck(...props: string[]): Chain<Partial<T>>
  probe(...props: string[]): Chain<T>
  product(selector?: ItemFunc<T, number>): Chain<number>
  reduce<A, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A) => C)): Chain<C>
  skip(n: number): Chain<T>
  skipUntil(func: ItemFilterFunc<T>): Chain<T>
  sum(selector?: ItemFunc<T, number>): Chain<number>
  take(n: number): Chain<T>
  takeUntil(func: ItemFilterFunc<T>): Chain<T>
  tap(func: ItemFunc<T, T>): Chain<T>
  tee(...gs: AsyncGeneratorFunc<T, any>[]): Chain<T>
  //teeZip()
  window(n: number): Chain<T[]>
}

export class Chain<T> extends Callable<T> implements AsyncIterable<T>, GeneratorChain<T>, ChainableMethods<T> {

  #iterator: AsyncIterator<T>

  #completer: ((g?: AsyncIterable<T>) => any) = async g => {
    for await (const item of g) { }
  }

  constructor(g: IterableInput<T>) {
    super()
    this.#iterator = from(g)
  }

  link<TNext>(g: AsyncGeneratorFunc<T, TNext> | IterableInput<TNext>): Chain<TNext> {
    if (typeof(g) == 'function') {
      return new Chain((g as AsyncGeneratorFunc<T, TNext>)(this))
    }
    return new Chain(g)
  }

  completer(_: ((g?: AsyncIterable<T>) => any)): this {
    this.#completer = _
    return this
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return this.#iterator
  }

  get iterate(): AsyncIterable<T> {
    return this
  }

  __call__(): any {
    return this.#completer(from(this.#iterator))
  }

  // #region ChainableMethods

  accumulate<U>(func: AccumulatorFunc<U, T>, initialValue?: U): Chain<U> {
    return this.link(accumulate(func, initialValue))
  }

  average(selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(average(selector))
  }

  count(): Chain<number> {
    return this.link(count())
  }

  filter(func: ItemFilterFunc<T>): Chain<T> {
    return this.link(filter(func))
  }

  first(): Chain<T> {
    return this.link(first())
  }

  iif<U>(condition: boolean | (() => boolean), gIfTrue: AsyncGeneratorFunc<T, U>, gIfFalse: AsyncGeneratorFunc<T, T | U>): Chain<T | U> {
    return this.link(iif(condition, gIfTrue, gIfFalse))
  }

  map<U>(func: ItemFunc<T, U>): Chain<U> {
    return this.link(map(func))
  }

  mapProp<U extends T>(prop: string, func: ItemFunc<T, U>): Chain<U> {
    return this.link(mapProp(prop, func))
  }

  max(selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(max(selector))
  }

  min(selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(min(selector))
  }

  movingAverage(n: number, selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(movingAverage(n, selector))
  }

  pluck(...props: string[]): Chain<Partial<T>> {
    return this.link(pluck(...props))
  }

  probe(...props: string[]): Chain<T> {
    return this.link(probe(...props))
  }

  product(selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(product(selector))
  }

  reduce<A, C>(func: AccumulatorFunc<A, T>, initialValue?: A, onComplete?: ((A) => C)): Chain<C> {
    return this.link(reduce(func, initialValue, onComplete))
  }

  skip(n: number): Chain<T> {
    return this.link(skip(n))
  }

  skipUntil(func: ItemFilterFunc<T>): Chain<T> {
    return this.link(skipUntil(func))
  }

  sum(selector?: ItemFunc<T, number>): Chain<number> {
    return this.link(sum(selector))
  }

  take(n: number): Chain<T> {
    return this.link(take(n))
  }

  takeUntil(func: ItemFilterFunc<T>): Chain<T> {
    return this.link(takeUntil(func))
  }

  tap(func: ItemFunc<T, T>): Chain<T> {
    return this.link(tap(func))
  }

  tee(...gs: AsyncGeneratorFunc<T, any>[]): Chain<T> {
    return this.link(tee(...gs))
  }
 
  window(n: number): Chain<T[]> {
    return this.link(window(n))
  }

  // #endregion
}

export function chain<T>(g?: IterableInput<T>): Chain<T> {
  return new Chain(g || from())
}

// Example of extending the chain object, this would be in another file.
// However, typescript can't infere the types used, so this isn't preferred to simply putting methods in Chain directly
/*
declare module './chain' {
  interface Chain<T> {
    map<T, U>(func: ItemFunc<T, U>): Chain<U>
  }
}

function mapChain<T, U>(this: Chain<T>, func: ItemFunc<T, U>): Chain<U> {
  return this.link(map(func))
}

Chain.prototype.map = mapChain
*/