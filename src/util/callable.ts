export abstract class Callable<T> extends Function {

  __self__: Function

  constructor() {
    super('...args', 'return this.__self__.__call__(...args)')

    var self = this.bind(this)
    this.__self__ = self
    
    return self
  }

  abstract __call__(): T
}