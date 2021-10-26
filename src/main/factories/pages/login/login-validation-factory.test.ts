import { ValidationBuilder } from '@/main/builder/validation-builder'
import { ValidatorComposite } from '@/main/composite/validator-composite'
import { makeLoginValidations } from './login-validation-factory'

jest.mock('@/main/composite/validator-composite')

describe('LoginValidationFactory', () => {
  test('ensure Validator Composite is called with the correct validations', () => {
    makeLoginValidations()
    expect(ValidatorComposite.build).toHaveBeenCalledWith([
      ...ValidationBuilder.fieldName('name').required().build(),
      ...ValidationBuilder.fieldName('password').required().min(5).build()
    ])
  })
})
