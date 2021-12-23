export class AsyncQueue {

  #queue: Promise<any>[] = []

  async execute<T>(asyncFunc: () => Promise<T>): Promise<T> {
    this.#queue.push((async () => {
      if (this.#queue.length) {
        await this.#queue[this.#queue.length-1]
      }

      return await asyncFunc()
    })())

    return await this.#queue[this.#queue.length-1]
  }
}