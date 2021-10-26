import React from 'react'
import Login from './login'
import { render, RenderResult } from '@testing-library/react'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

const VALIDATION_ERROR_MESSAGE = faker.random.words(2)

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
})
