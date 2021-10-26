import { FieldValidation } from '@/validation/protocols'
import { MinLengthError } from '@/validation/errors'

export class MinLengthValidator implements FieldValidation {
  constructor (
    public readonly field: string,
    private readonly minLength: number
  ) {}

  validate (inputData: {[key: string]: any}): Error | null {
    return inputData[this.field].length < this.minLength
      ? new MinLengthError(this.field, this.minLength)
      : null
  }
}
