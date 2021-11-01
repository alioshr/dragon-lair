export class MinLengthError extends Error {
  constructor (field: string, length: number) {
    super(`${field} requer no mínimo ${length} caracteres`)
    this.name = 'MinLengthError'
  }
}
