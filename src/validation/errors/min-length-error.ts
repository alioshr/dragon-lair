export class MinLengthError extends Error {
  constructor (field: string, length: number) {
    super(`${field} needs a minimum length of ${length}`)
    this.name = 'MinLengthError'
  }
}
