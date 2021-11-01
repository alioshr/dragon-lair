import Login from './login'
import { waitFor, screen } from '@testing-library/react'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy, renderWithHistory } from '@/presentation/test'
import faker from 'faker'
import { createMemoryHistory } from 'history'

const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
const CREDENTIALS = {
  name: faker.random.words(),
  password: faker.internet.password()
}

const makeValidSubmit = (): void => {
  Helper.populateField('password', CREDENTIALS.password)
  Helper.populateField('name', CREDENTIALS.name)
  Helper.clickElement('submit-button')
}

const makeValidationSpyAssertion = (
  validationSpy: ValidationSpy,
  fieldName: string,
  credentials: any
): void => {
  const validatorSpy = jest.spyOn(validationSpy, 'validate')
  fieldName === 'name'
    ? Helper.populateField('name', CREDENTIALS.name)
    : Helper.populateField('password', CREDENTIALS.password)

  expect(validatorSpy).toHaveBeenCalledWith(fieldName, credentials)
  expect(validationSpy.inputData).toEqual(credentials)
}

type SutTypes = {
  validatorSpy: ValidationSpy
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null
  renderWithHistory({
    history,
    Page: () => Login({ validator: validatorSpy })
  })
  return {
    validatorSpy
  }
}

describe.only('Login', () => {
  test('Should init with the correct initial state', () => {
    makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.testButtonDisabled('submit-button', true)
    Helper.testStatusForField('name', 'default', VALIDATION_ERROR_MESSAGE)
    Helper.testStatusForField(
      'password',
      'default',
      VALIDATION_ERROR_MESSAGE
    )
  })
  test('Should call validation with the correct name', () => {
    const { validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, 'name', {
      name: CREDENTIALS.name,
      password: ''
    })
  })
  test('Should show a name error if validation fails', () => {
    const { validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.populateField('name', CREDENTIALS.name)
    Helper.testStatusForField(
      'name',
      'default',
      validatorSpy.errorMessage as string
    )
  })
  test('Should call validation with the correct password', () => {
    const { validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, 'password', {
      name: '',
      password: CREDENTIALS.password
    })
  })
  test('Should show a password error if validation fails', () => {
    const { validatorSpy } = makeSut(VALIDATION_ERROR_MESSAGE)
    Helper.populateField('password', CREDENTIALS.password)
    Helper.testStatusForField(
      'password',
      'default',
      validatorSpy.errorMessage as string
    )
  })
  test('Should show a valid name if validation succeeds', () => {
    makeSut()
    Helper.populateField('name', CREDENTIALS.name)
    Helper.testStatusForField('name', 'valid')
  })
  test('Should show a valid password if validation succeeds', () => {
    makeSut()
    Helper.populateField('password', CREDENTIALS.password)
    Helper.testStatusForField('password', 'valid')
  })
  test('Should enable the submit button if the form is valid', () => {
    makeSut()
    Helper.populateField('password', CREDENTIALS.password)
    Helper.populateField('name', CREDENTIALS.name)
    Helper.testButtonDisabled('submit-button', false)
  })
  test('Should go to homepage on auth success', async () => {
    makeSut()
    makeValidSubmit()
    const form = screen.getByTestId('login-form')
    await waitFor(() => form)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
})
