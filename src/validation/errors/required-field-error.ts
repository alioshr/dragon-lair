export class RequiredFieldError extends Error {
  constructor (field: string) {
    super(`${field} obrigatório!`)
    this.name = 'RequiredFieldError'
  }
}
