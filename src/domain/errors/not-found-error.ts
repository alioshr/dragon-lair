export class NotFoundError extends Error {
  constructor () {
    super('Poxa, não encontramos o que está procurando =(')
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
