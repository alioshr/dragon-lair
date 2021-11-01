import { MinLengthError } from '@/validation/errors'
import faker from 'faker'
import { MinLengthValidator } from '@/validation/validators'

const FIELD = 'word'
const MIN_LENGTH = 8

const makeSut = (field: string, minLength: number): MinLengthValidator =>
  new MinLengthValidator(field, minLength)

describe('MinLengthValidator', () => {
  test('Should return an error if field is shorter then minLength', () => {
    const sut = makeSut(FIELD, MIN_LENGTH)
    const result = sut.validate({ word: faker.random.alphaNumeric(7) })
    expect(result).toEqual(new MinLengthError(FIELD, MIN_LENGTH))
  })
  test('Should return null if field is >= fieldLength', () => {
    const sut = makeSut(FIELD, 8)
    const result = sut.validate({ word: faker.random.alphaNumeric(10) })
    expect(result).toBe(null)
  })
})
