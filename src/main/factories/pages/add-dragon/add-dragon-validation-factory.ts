import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { Validator } from '@/presentation/protocols'

export const makeAddDragonValidations = (): Validator => {
  return ValidatorComposite.build([
    ...ValidationBuilder.fieldName('name').required().notEqual('defaultName').build(),
    ...ValidationBuilder.fieldName('type').required().notEqual('defaultType').min(5).build()
  ])
}
