import { AddDragonSpy, ValidationSpy } from '@/presentation/test'
import { RenderResult, render } from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import { mockedDragons } from '@/domain/test'
import { AddDragon } from '..'
import * as Helper from '@/presentation/test/form-helper'

const DRAGON = mockedDragons()[0]
const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
const INPUT_DATA = {
  name: faker.random.words(),
  type: faker.internet.password()
}
const makeValidationSpyAssertion = (
  validationSpy: ValidationSpy,
  sut: RenderResult,
  fieldName: string,
  credentials: any
): void => {
  const validatorSpy = jest.spyOn(validationSpy, 'validate')
  fieldName === 'name'
    ? Helper.populateField(sut, 'name', INPUT_DATA.name)
    : Helper.populateField(sut, 'type', INPUT_DATA.type)

  expect(validatorSpy).toHaveBeenCalledWith(fieldName, credentials)
  expect(validationSpy.inputData).toEqual(credentials)
}

type SutTypes = {
  sut: RenderResult
  addDragonSpy: AddDragonSpy
  validatorSpy: ValidationSpy
}
const makeSut = (
  addDragonSpy = new AddDragonSpy(DRAGON),
  validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null
  const sut = render(
    <AddDragon validator={validatorSpy}/>
  )
  return { sut, addDragonSpy, validatorSpy }
}

describe('UpdateDragon', () => {
  test('should load with the correct initial state', () => {
    const { sut } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.testButtonDisabled('submit-button', true)
    Helper.testStatusForField(sut, 'name', 'default', VALIDATION_ERROR_MESSAGE)
    Helper.testStatusForField(
      sut,
      'type',
      'default',
      VALIDATION_ERROR_MESSAGE
    )
  })
  test('Should call validation with the correct name', async () => {
    const { sut, validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, sut, 'name', {
      name: INPUT_DATA.name,
      type: ''
    })
  })
  test('Should show a name error if validation fails', () => {
    const { sut, validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.populateField(sut, 'name', INPUT_DATA.name)
    Helper.testStatusForField(
      sut,
      'name',
      'default',
      validatorSpy.errorMessage as string
    )
  })
  test('Should call validation with the correct type', async () => {
    const { sut, validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    makeValidationSpyAssertion(validatorSpy, sut, 'type', {
      name: '',
      type: INPUT_DATA.type
    })
  })
  test('Should show a type error if validation fails', () => {
    const { sut, validatorSpy } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    Helper.populateField(sut, 'type', INPUT_DATA.name)
    Helper.testStatusForField(
      sut,
      'type',
      'default',
      validatorSpy.errorMessage as string
    )
  })
  test('Should show a valid name if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name', INPUT_DATA.name)
    Helper.testStatusForField(sut, 'name', 'valid')
  })
})
