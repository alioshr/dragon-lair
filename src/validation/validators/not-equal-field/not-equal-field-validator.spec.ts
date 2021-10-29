import { NotEqualParamError } from '../../errors'
import { NotEqualFieldValidator } from './not-equal-field-validator'

const makeSut = (field: string, fieldToCompare: string): NotEqualFieldValidator =>
  new NotEqualFieldValidator(field, fieldToCompare)

describe('CompareFieldValidator', () => {
  test('Deve retornar null se o field estiver vazio', () => {
    const sut = makeSut('field', 'otherField')
    const inputData = {
      field: '',
      otherField: 'asdasdd'
    }
    const result = sut.validate(inputData)
    expect(result).toEqual(null)
  })
  test('Deve retornar null se os campos forem diferentes', () => {
    const sut = makeSut('field', 'otherField')
    const value = 'valid_value'
    const inputData = {
      field: value,
      otherField: value
    }
    const result = sut.validate(inputData)
    expect(result).toEqual(new NotEqualParamError('field'))
  })
})
