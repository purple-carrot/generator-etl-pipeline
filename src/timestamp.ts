import { ResetableTransformer } from './types'
import { map } from './map'

export function timestamp<T>(baseTime: number | string): ResetableTransformer<T, { value: T, timestamp: number }> {
  baseTime = baseTime == 'now' ? (new Date()).getTime() : (baseTime || 0)

  let result: any = map(d => ({
    value: d,
    timestamp: (new Date()).getTime() - (baseTime as number)
  }))

  result.reset = startTime => {
    baseTime = startTime || (new Date()).getTime()
  }

  return result
}