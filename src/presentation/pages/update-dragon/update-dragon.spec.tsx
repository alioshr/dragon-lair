import { mockedDragons } from '@/domain/test'
import { GetDragonSpy } from '@/presentation/test/get-dragon-spy'
import React from 'react'
import { UpdateDragon } from '..'
import { render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router'
import { Route } from 'react-router-dom'

const DRAGON = mockedDragons()[0]

type SutTypes = {
  sut: RenderResult
  getDragonSpy: GetDragonSpy
}
const history = createMemoryHistory({ initialEntries: ['/update/1'] })
const makeSut = (getDragonSpy = new GetDragonSpy(DRAGON)): SutTypes => {
  const sut = render(
    <Router history={history}>
      <Route
        exact
        path="/update/:id"
        render={() => <UpdateDragon getDragon={getDragonSpy} />}
      />
    </Router>
  )
  return { sut, getDragonSpy }
}

describe('UpdateDragon', () => {
  test('should call GetDragon with the correct state', () => {
    const { getDragonSpy } = makeSut()
    expect(getDragonSpy.callCount).toBe(1)
    expect(getDragonSpy.id).toBe('1')
  })
})
