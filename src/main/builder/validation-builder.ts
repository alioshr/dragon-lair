import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldValidator, MinLengthValidator } from '@/validation/validators'
import { NotEqualFieldValidator } from '@/validation/validators/'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static fieldName (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidator(this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidator(this.fieldName, length))
    return this
  }

  notEqual (fieldToCompare: string): ValidationBuilder {
    this.validations.push(new NotEqualFieldValidator(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
