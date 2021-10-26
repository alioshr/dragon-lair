import React from 'react'
import Login from './login'
import { render, RenderResult } from '@testing-library/react'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
const CREDENTIALS = {
  name: faker.random.words(),
  password: faker.internet.password()
}

const makeValidationSpyAssertion = (
  validationSpy: ValidationSpy,
  sut: RenderResult,
  fieldName: string,
  credentials: any
): void => {
  const validatorSpy = jest.spyOn(validationSpy, 'validate')
  fieldName === 'name'
    ? Helper.populateField(sut, 'name', CREDENTIALS.name)
    : Helper.populateField(sut, 'password', CREDENTIALS.password)

  expect(validatorSpy).toHaveBeenCalledWith(
    fieldName,
    credentials
  )
  expect(validationSpy.inputData).toEqual(
    credentials
  )
}

type SutTypes = {
  sut: RenderResult
  validatorSpy: ValidationSpy
}

const makeSut = (validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null
  const sut = render(<Login validator={validatorSpy}/>)
  return { sut, validatorSpy }
}

describe('Login', () => {
  test('Should init with the correct initial state', () => {
    const { sut } = makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.testButtonDisabled(sut, 'submit-button', true)
    Helper.testStatusForField(sut, 'name', 'default', VALIDATION_ERROR_MESSAGE)
    Helper.testStatusForField(sut, 'password', 'default', VALIDATION_ERROR_MESSAGE)
  })
  test('Should call validation with the correct name', () => {
    const { sut, validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, sut, 'name', { name: CREDENTIALS.name, password: '' })
  })
  test('Should show a name error if validation fails', () => {
    const { sut, validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.populateField(sut, 'name', CREDENTIALS.name)
    Helper.testStatusForField(sut, 'name', 'default', validatorSpy.errorMessage as string)
  })
})
