export function* generate<T>(init: () => T, check: (T) => boolean, increment: (t) => T): Generator<T> {
  let counter = init()
  while (check(counter)) {
    yield counter
    counter = increment(counter)
  }
}