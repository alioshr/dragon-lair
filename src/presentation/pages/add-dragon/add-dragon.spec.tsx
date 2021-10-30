import { AddDragonSpy, ValidationSpy } from '@/presentation/test'
import { RenderResult, render } from '@testing-library/react'
import React from 'react'
import faker from 'faker'
import { mockedDragons } from '@/domain/test'
import { AddDragon } from '..'
import * as Helper from '@/presentation/test/form-helper'

const DRAGON = mockedDragons()[0]
const VALIDATION_ERROR_MESSAGE = faker.random.words(2)

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
})
