import { mockedDragons } from '@/domain/test'
import { GetDragonSpy } from '@/presentation/test/get-dragon-spy'
import React from 'react'
import { UpdateDragon } from '..'
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import { Route } from 'react-router-dom'
import * as Helper from '@/presentation/test/form-helper'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'
import { UpdateDragonSpy } from '@/presentation/test/update-dragon-spy'

const DRAGON = mockedDragons()[0]
const VALIDATION_ERROR_MESSAGE = faker.random.words(2)
// const FORM_DATA = {
//   name: faker.random.words(),
//   type: faker.random.words(5)
// }

// const makeValidationSpyAssertion = (
//   validationSpy: ValidationSpy,
//   sut: RenderResult,
//   fieldName: string,
//   credentials: any
// ): void => {
//   const validatorSpy = jest.spyOn(validationSpy, 'validate')
//   fieldName === 'name'
//     ? Helper.populateField(sut, 'name', FORM_DATA.name)
//     : Helper.populateField(sut, 'type', FORM_DATA.type)
//   expect(validatorSpy).toHaveBeenCalledWith(fieldName, credentials)
//   expect(validationSpy.inputData).toEqual(credentials)
// }

type SutTypes = {
  sut: RenderResult
  getDragonSpy: GetDragonSpy
  validatorSpy: ValidationSpy
}
const history = createMemoryHistory({ initialEntries: ['/update/1'] })
const makeSut = (
  getDragonSpy = new GetDragonSpy(DRAGON),
  validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null
  const sut = render(
    <Router history={history}>
      <Route
        exact
        path="/update/:id"
        render={() => <UpdateDragon
          getDragon={getDragonSpy}
          validator={validatorSpy}
          updateDragon={new UpdateDragonSpy(DRAGON)}
          />}
      />
    </Router>
  )
  return { sut, getDragonSpy, validatorSpy }
}

describe('UpdateDragon', () => {
  test('should call GetDragon with the correct state', () => {
    const { getDragonSpy } = makeSut()
    expect(getDragonSpy.callCount).toBe(1)
    expect(getDragonSpy.id).toBe('1')
  })
  test('should present a skeleton while getting the dragon', () => {
    makeSut()
    const wrapper = screen.getByTestId('wrapper')
    const skeleton = wrapper.querySelector('div.skeleton')
    const form = wrapper.querySelector('form')
    expect(skeleton).toBeTruthy()
    expect(form).toBeNull()
  })
  test('should present populated form on success with button disabled', async () => {
    makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    const wrapper = screen.getByTestId('wrapper')
    await waitFor(() => wrapper)
    const nameInput = screen.getByTestId('name-input')
    const typeInput = screen.getByTestId('type-input')
    expect((nameInput as HTMLInputElement).value).toBe(DRAGON.name)
    expect((typeInput as HTMLInputElement).value).toBe(DRAGON.type)
    Helper.testButtonDisabled('submit-button', true)
  })
  test.skip('Should call validation with the correct name', async () => {
    const { sut } = makeSut(undefined, VALIDATION_ERROR_MESSAGE)
    const wrapper = screen.getByTestId('wrapper')
    await waitFor(() => wrapper)
    const nameInput = sut.getByTestId('input') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'value' } })
    expect(nameInput.value).toBe('value')
  })
})
