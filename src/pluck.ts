import { map } from './map'
import { pick } from 'lodash'

export const pluck = (...props: string[]) => map(d => pick(d, props))
