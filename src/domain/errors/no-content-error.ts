export class NoContentError extends Error {
  constructor () {
    super('Não exitem dragões registrados no momento.')
    this.name = 'NoContentError'
    Object.setPrototypeOf(this, NoContentError.prototype)
  }
}
