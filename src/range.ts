export function* range(start: number, stop: number, increment: number = 1): Generator<number> {
  for (let i = start; i < stop; i += increment) {
    yield i
  }
}