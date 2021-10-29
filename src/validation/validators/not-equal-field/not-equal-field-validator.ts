import { NotEqualParamError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class NotEqualFieldValidator implements FieldValidation {
  constructor (
    public readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (inputData: {[key: string]: any}): Error | null {
    return inputData[this.fieldToCompare] !== inputData[this.field]
      ? null
      : new NotEqualParamError(this.field)
  }
}
