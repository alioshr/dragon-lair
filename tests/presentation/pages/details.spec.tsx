import { mockedDragons } from '@/../tests/domain/mocks'
import { GetDragonSpy } from '../mocks/get-dragon-spy'
import { RenderResult, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { createMemoryHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { DetailsDragonPage } from '@/presentation/pages'

const DRAGON = mockedDragons()[0]

type SutTypes = {
  sut: RenderResult
  getDragonSpy: GetDragonSpy
}
const history = createMemoryHistory({ initialEntries: ['/details/1'] })
const makeSut = (getDragonSpy = new GetDragonSpy(DRAGON)): SutTypes => {
  const sut = render(
    <Router history={history}>
      <Route
        exact
        path="/details/:id"
        render={() => <DetailsDragonPage
          getDragon={getDragonSpy}
          />}
      />
    </Router>
  )
  return { sut, getDragonSpy }
}

describe('DetailsDragonPage', () => {
  test('should call GetDragon with the correct state', () => {
    const { getDragonSpy } = makeSut()
    expect(getDragonSpy.callCount).toBe(1)
    expect(getDragonSpy.id).toBe('1')
  })
  test('should present a skeleton while getting the dragon', () => {
    makeSut()
    const wrapper = screen.getByTestId('wrapper')
    const skeleton = wrapper.querySelector('div.skeleton')
    const contentCards = wrapper.querySelectorAll('div.info')
    expect(skeleton).toBeTruthy()
    expect(contentCards).toHaveLength(0)
  })
  test('should present an error if GetDragon fails', async () => {
    const dragonSpy = new GetDragonSpy(DRAGON)
    jest.spyOn(dragonSpy, 'get').mockRejectedValueOnce(new Error('asd'))
    makeSut(dragonSpy)
    const dragonList = screen.getByTestId('content-wrapper')
    await waitFor(() => dragonList)
    expect(screen.getByTestId('error').textContent).toBe('asd')
  })
  test('should present data on success', async () => {
    makeSut()
    const wrapper = screen.getByTestId('wrapper')
    await waitFor(() => wrapper)
    const skeleton = wrapper.querySelector('div.skeleton')
    expect(skeleton).toBeNull()
    expect(screen.findByText(DRAGON.name)).toBeTruthy()
    expect(screen.findByText(DRAGON.type)).toBeTruthy()
    expect(screen.findByText(new Date(DRAGON.createdAt).getDate())).toBeTruthy()
    expect(screen.findByText(new Date(DRAGON.createdAt).getMonth() + 1)).toBeTruthy()
    expect(screen.findByText(new Date(DRAGON.createdAt).getFullYear())).toBeTruthy()
  })
})
