import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { Validator } from '@/presentation/protocols'

export const makeUpdateDragonValidations = (): Validator => {
  return ValidatorComposite.build([
    ...ValidationBuilder.fieldName('name').required().notEqual('nameDefault').build(),
    ...ValidationBuilder.fieldName('type').required().notEqual('typeDefault').min(5).build()
  ])
}
