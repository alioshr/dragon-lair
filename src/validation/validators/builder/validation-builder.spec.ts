import { RequiredFieldValidator, MinLengthValidator } from '@/validation/validators'
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
      .required()
      .min(length)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidator(field),
      new MinLengthValidator(field, length)
    ])
    expect(validations.length).toBe(2)
  })
})
