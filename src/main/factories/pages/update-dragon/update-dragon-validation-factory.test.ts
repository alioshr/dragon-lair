import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { makeUpdateDragonValidations } from './update-dragon-validation-factory'

jest.mock('@/main/composite/validator-composite')

describe('LoginValidationFactory', () => {
  test('ensure Validator Composite is called with the correct validations', () => {
    makeUpdateDragonValidations()
    expect(ValidatorComposite.build).toHaveBeenCalledWith([
      ...ValidationBuilder.fieldName('name').required().notEqual('nameDefault').build(),
      ...ValidationBuilder.fieldName('type').required().notEqual('typeDefault').min(5).build()
    ])
  })
})
