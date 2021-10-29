import { RequiredFieldValidator, MinLengthValidator, NotEqualFieldValidator } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import faker from 'faker'

const field = faker.database.column()
const length = faker.datatype.number()

describe('ValidationBuilder', () => {
  test('Should call RequiredFieldValidation with the correct param', () => {
    const validations = sut.fieldName(field)
      .required()
      .build()
    expect(validations).toEqual([new RequiredFieldValidator(field)])
  })
  test('Should call MinLengthValidator with the correct param', () => {
    const validations = sut.fieldName(field)
      .min(length)
      .build()
    expect(validations).toEqual([new MinLengthValidator(field, length)])
  })
  test('Should have the correct number of Validation dependencies', () => {
    const validations = sut.fieldName(field)
      .min(length)
      .required()
      .build()
    expect(validations).toEqual([new MinLengthValidator(field, length), new RequiredFieldValidator(field)])
    expect(validations.length).toBe(2)
  })
  test('Should call NotEqualFieldValidator with the correct params', () => {
    const validations = sut.fieldName(field)
      .notEqual('fieldToCompare')
      .build()
    expect(validations).toEqual([new NotEqualFieldValidator(field, 'fieldToCompare')])
  })
})
