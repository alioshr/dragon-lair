import React from 'react'
import Login from './login'
import { render, RenderResult, waitFor } from '@testing-library/react'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy, AccessTokenStub } from '@/presentation/test'
import faker from 'faker'
import { SaveAccessToken } from '@/domain/usecases'

const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
const CREDENTIALS = {
  name: faker.random.words(),
  password: faker.internet.password()
}

const makeValidSubmit = (
  sut: RenderResult
): void => {
  Helper.populateField(sut, 'password', CREDENTIALS.password)
  Helper.populateField(sut, 'name', CREDENTIALS.name)
  Helper.clickElement(sut, 'submit-button')
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
  saveAccessTokenStub: SaveAccessToken
}

const makeSut = (validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  const saveAccessTokenStub = new AccessTokenStub()
  validatorSpy.errorMessage = validationError ?? null
  const sut = render(
  <Login
    validator={validatorSpy}
    saveAccessToken={saveAccessTokenStub}
    />)
  return { sut, validatorSpy, saveAccessTokenStub }
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
  test('Should call validation with the correct password', () => {
    const { sut, validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, sut, 'password', { name: '', password: CREDENTIALS.password })
  })
  test('Should show a password error if validation fails', () => {
    const { sut, validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.populateField(sut, 'password', CREDENTIALS.password)
    Helper.testStatusForField(sut, 'password', 'default', validatorSpy.errorMessage as string)
  })
  test('Should show a valid name if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name', CREDENTIALS.name)
    Helper.testStatusForField(sut, 'name', 'valid')
  })
  test('Should show a valid password if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password', CREDENTIALS.password)
    Helper.testStatusForField(sut, 'password', 'valid')
  })
  test('Should enable the submit button if the form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password', CREDENTIALS.password)
    Helper.populateField(sut, 'name', CREDENTIALS.name)
    Helper.testButtonDisabled(sut, 'submit-button', false)
  })
  test('Should call SaveAccessToken with user name on success', async () => {
    const { sut, saveAccessTokenStub } = makeSut()
    const saveTokenSpy = jest.spyOn(saveAccessTokenStub, 'save')
    makeValidSubmit(sut)
    const form = sut.getByTestId('login-form')
    await waitFor(() => form)
    expect(saveTokenSpy).toHaveBeenCalledWith(CREDENTIALS.name)
  })
  test('Should present an error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenStub } = makeSut()
    const error = new Error('Oh, boy. Something went wrong')
    jest.spyOn(saveAccessTokenStub, 'save').mockReturnValueOnce(Promise.reject(error))
    makeValidSubmit(sut)
    await Helper.testChildCount(sut, 'status-wrapper', 1)
    const mainErrorLabel = sut.getByTestId('main-error')
    expect(mainErrorLabel.textContent).toBe(error.message)
  })
})
