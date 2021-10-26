import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { Validator } from '@/presentation/protocols'

export const makeLoginValidations = (): Validator => {
  return ValidatorComposite.build([
    ...ValidationBuilder.fieldName('name').required().build(),
    ...ValidationBuilder.fieldName('password').required().min(5).build()
  ])
}
