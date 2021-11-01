import { waitFor, screen } from '@testing-library/dom'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router } from 'react-router-dom'
import { UpdateDragon } from '@/presentation/pages'
import { mockedDragons } from '../../domain/mocks'
import { ValidationSpy, renderWithHistory } from '../mocks'
import { GetDragonSpy } from '../mocks/get-dragon-spy'
import { UpdateDragonSpy } from '../mocks/update-dragon-spy'
import * as Helper from '../mocks/form-helper'

const DRAGON = mockedDragons()[0]
const VALIDATION_ERROR_MESSAGE = faker.random.words(2)

type SutTypes = {
  getDragonSpy: GetDragonSpy
  validatorSpy: ValidationSpy
}
const history = createMemoryHistory({ initialEntries: ['/update/1'] })
const makeSut = (
  getDragonSpy = new GetDragonSpy(DRAGON),
  validationError?: string): SutTypes => {
  const validatorSpy = new ValidationSpy()
  validatorSpy.errorMessage = validationError ?? null

  renderWithHistory({
    history,
    Page: () => <Router history={history}>
    <Route
      exact
      path="/update/:id"
      render={() =>
      <UpdateDragon
        getDragon={getDragonSpy}
        validator={validatorSpy}
        updateDragon={new UpdateDragonSpy(DRAGON)}
        />}
    />
  </Router>
  })
  return {
    validatorSpy,
    getDragonSpy
  }
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
})
