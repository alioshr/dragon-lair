export class UnexpectedError extends Error {
  constructor () {
    super('Ops... Algo deu errado')
    this.name = 'UnexpectedError'
  }
}
