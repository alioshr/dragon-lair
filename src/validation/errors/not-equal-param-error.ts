export class NotEqualParamError extends Error {
  constructor (field: string) {
    super(`O valor do ${field} não difere do seu valor original`)
    this.name = 'NotEqualParamError'
  }
}
