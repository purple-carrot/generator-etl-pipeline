import { AsyncGeneratorFunc } from './types'
import { identity } from './identity'

export function iif<TIn, TOut>(condition: boolean | (() => boolean), 
                                gIfTrue: AsyncGeneratorFunc<TIn, TOut>, 
                                gIfFalse: AsyncGeneratorFunc<TIn, TIn | TOut> = identity())
                              : AsyncGeneratorFunc<TIn, TIn | TOut> {

  let conditionResult = typeof(condition) == 'function' ? condition() : condition

  return conditionResult ? gIfTrue : gIfFalse
}