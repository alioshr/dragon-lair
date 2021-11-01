import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { makeAddDragonValidations } from '@/main/factories/pages/add-dragon/add-dragon-validation-factory'

jest.mock('@/main/composite/validator-composite')

describe('LoginValidationFactory', () => {
  test('ensure Validator Composite is called with the correct validations', () => {
    makeAddDragonValidations()
    expect(ValidatorComposite.build).toHaveBeenCalledWith([
      ...ValidationBuilder.fieldName('name').required().notEqual('defaultName').build(),
      ...ValidationBuilder.fieldName('type').required().notEqual('defaultType').min(5).build()
    ])
  })
})
