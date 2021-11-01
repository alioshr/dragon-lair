import { AddDragonSpy, renderWithHistory, ValidationSpy } from '../mocks'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import faker from 'faker'
import { mockedDragons } from '@/../tests/domain/mocks'
import { AddDragon } from '@/presentation/pages'
import * as Helper from '../mocks/form-helper'
import { createMemoryHistory } from 'history'

const DRAGON = mockedDragons()[0]
const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
const INPUT_DATA = {
  name: faker.random.words(),
  type: faker.internet.password()
}

const makeValidSubmit = (): void => {
  Helper.populateField('type', INPUT_DATA.type)
  Helper.populateField('name', INPUT_DATA.name)
  Helper.clickElement('submit-button')
}

const makeValidationSpyAssertion = (
  validationSpy: ValidationSpy,
  fieldName: string,
  credentials: any
): void => {
  const validatorSpy = jest.spyOn(validationSpy, 'validate')
  fieldName === 'name'
    ? Helper.populateField('name', INPUT_DATA.name)
    : Helper.populateField('type', INPUT_DATA.type)

  expect(validatorSpy).toHaveBeenCalledWith(fieldName, credentials)
  expect(validationSpy.inputData).toEqual(credentials)
}

type SutTypes = {
  addDragonSpy: AddDragonSpy
  validatorSpy: ValidationSpy
}

const history = createMemoryHistory({ initialEntries: ['/new'] })
const makeSut = (
  addDragonSpy = new AddDragonSpy(DRAGON),
  validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null
  renderWithHistory({
    history,
    Page: () => AddDragon({ createDragon: addDragonSpy, validator: validatorSpy })
  })
  return {
    validatorSpy,
    addDragonSpy
  }
}

describe('UpdateDragon', () => {
  test('should load with the correct initial state', () => {
    makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.testButtonDisabled('submit-button', true)
    Helper.testStatusForField('name', 'default', VALIDATION_ERROR_MESSAGE)
    Helper.testStatusForField(
      'type',
      'default',
      VALIDATION_ERROR_MESSAGE
    )
  })
  test('Should call validation with the correct name', async () => {
    const { validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, 'name', {
      name: INPUT_DATA.name,
      type: ''
    })
  })
  test('Should show a name error if validation fails', () => {
    const { validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.populateField('name', INPUT_DATA.name)
    Helper.testStatusForField(
      'name',
      'default',
      validatorSpy.errorMessage
    )
  })
  test('Should call validation with the correct type', async () => {
    const { validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, 'type', {
      name: '',
      type: INPUT_DATA.type
    })
  })
  test('Should show a type error if validation fails', () => {
    const { validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.populateField('type', INPUT_DATA.name)
    Helper.testStatusForField(
      'type',
      'default',
      validatorSpy.errorMessage
    )
  })
  test('Should show a valid name if validation succeeds', () => {
    makeSut()
    Helper.populateField('name', INPUT_DATA.name)
    Helper.testStatusForField('name', 'valid')
  })
  test('Should show a valid type if validation succeeds', () => {
    makeSut()
    Helper.populateField('type', INPUT_DATA.name)
    Helper.testStatusForField('type', 'valid')
  })
  test('Should enable the submit button if the form is valid', () => {
    makeSut()
    Helper.populateField('type', INPUT_DATA.type)
    Helper.populateField('name', INPUT_DATA.name)
    Helper.testButtonDisabled('submit-button', false)
  })
  test('Should call AddDragon with the correct params', async () => {
    const { addDragonSpy } = makeSut()
    makeValidSubmit()
    const form = screen.getByTestId('form')
    await waitFor(() => form)
    expect(addDragonSpy.body).toEqual(INPUT_DATA)
  })
  test('Should not call AddDragon if the form is invalid', async () => {
    const { addDragonSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    const form = screen.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
    expect(addDragonSpy.callCount).toBe(0)
  })
  test('Should present an error if AddDragon fails', async () => {
    const { addDragonSpy } = makeSut()
    const error = new Error('Oh, boy. Something went wrong')
    jest
      .spyOn(addDragonSpy, 'add')
      .mockReturnValueOnce(Promise.reject(error))
    makeValidSubmit()
    await Helper.testChildCount('status-wrapper', 1)
    const mainErrorLabel = screen.getByTestId('main-error')
    expect(mainErrorLabel.textContent).toBe(error.message)
  })
  test('Should go to homepage on auth success', async () => {
    makeSut()
    makeValidSubmit()
    const form = screen.getByTestId('form')
    await waitFor(() => form)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
})
