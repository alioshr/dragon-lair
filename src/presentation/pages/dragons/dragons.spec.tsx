import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from '@testing-library/react'
import { Dragons } from '..'
import { mockedDragons } from '@/domain/test'
import { ExcludeDragonSpy, GetDragonsSpy } from '@/presentation/test'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { NoContentError, UnexpectedError } from '@/domain/errors'

const DRAGONS = mockedDragons()

type SutTypes = {
  sut: RenderResult
  getDragonsSpy: GetDragonsSpy
  excludeDragonSpy: ExcludeDragonSpy
}
const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (
  getDragonsSpy = new GetDragonsSpy(DRAGONS),
  excludeDragonSpy = new ExcludeDragonSpy()
): SutTypes => {
  const sut = render(
    <Router history={history}>
    <Dragons excludeDragon={excludeDragonSpy} getDragons={getDragonsSpy} />
    </Router>
  )
  return { sut, getDragonsSpy, excludeDragonSpy }
}
describe('Dragons', () => {
  test('Should load 4 skeletons initially', () => {
    const { sut } = makeSut()
    const dragonList = sut.getByTestId('dragons-list')
    const skeletons = dragonList.querySelectorAll('li:empty')
    expect(skeletons.length).toBe(4)
  })
  test('should render Dragons on success', async () => {
    makeSut()
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const dragons = dragonList.querySelectorAll('div.dragonContent')
    const skeletons = dragonList.querySelectorAll('li:empty')
    expect(dragons).toHaveLength(3)
    expect(skeletons.length).toBe(0)
  })
  test('Should call GetDragons just once on start', () => {
    const { getDragonsSpy } = makeSut()
    expect(getDragonsSpy.callCount).toBe(1)
  })
  test('should present an error if GetDragons fails', async () => {
    const getDragonsSpy = new GetDragonsSpy(DRAGONS)
    jest
      .spyOn(getDragonsSpy, 'get')
      .mockRejectedValueOnce(new Error('horrible error'))
    makeSut(getDragonsSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    expect(screen.getByTestId('error')).toBeTruthy()
  })
  test('Should call GetDragons on reload if throws UnexpectedError', async () => {
    const getDragonsSpy = new GetDragonsSpy(DRAGONS)
    jest
      .spyOn(getDragonsSpy, 'get')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(getDragonsSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    fireEvent.click(screen.getByTestId('reload'))
    expect(getDragonsSpy.callCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
  test('Should present create dragon option if GetDragons throws NoContentError', async () => {
    const getDragonsSpy = new GetDragonsSpy(DRAGONS)
    jest
      .spyOn(getDragonsSpy, 'get')
      .mockRejectedValueOnce(new NoContentError())
    makeSut(getDragonsSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    expect(screen.getByTestId('create-dragon-error')).toBeTruthy()
  })
  test('Should call ExcludeDragon with the correct dragon id', async () => {
    const { excludeDragonSpy } = makeSut()
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const excludeButton = screen.getByTestId(`exclude-${DRAGONS[0].id}`)
    fireEvent.click(excludeButton)
    expect(excludeDragonSpy.id).toBe(DRAGONS[0].id)
  })
  test('Should hide exclude button and present spinner on click to ExcludeDragon ', async () => {
    makeSut()
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const excludeButton = screen.getByTestId(`exclude-${DRAGONS[0].id}`)
    fireEvent.click(excludeButton)
    const spinners = dragonList.querySelectorAll('div.spinner')
    expect(spinners.length).toBe(1)
    const excludeButtons = dragonList.querySelectorAll('div.exclude')
    expect(excludeButtons.length).toBe(2)
  })
  test('Should should reload dragons if exclusion succeeds', async () => {
    const { getDragonsSpy } = makeSut()
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const excludeButton = screen.getByTestId(`exclude-${DRAGONS[0].id}`)
    expect(getDragonsSpy.callCount).toBe(1)
    fireEvent.click(excludeButton)
    await waitFor(() => dragonList)
    expect(getDragonsSpy.callCount).toBe(2)
  })
  test('Should present error if exclusion fails', async () => {
    const excludeDragonSpy = new ExcludeDragonSpy()
    jest
      .spyOn(excludeDragonSpy, 'delete')
      .mockRejectedValueOnce(new Error('horrible error'))
    makeSut(new GetDragonsSpy(DRAGONS), excludeDragonSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const excludeButton = screen.getByTestId(`exclude-${DRAGONS[0].id}`)
    fireEvent.click(excludeButton)
    await waitFor(() => dragonList)
    expect(screen.getByTestId('error')).toBeTruthy()
    expect(screen.getByTestId('error').textContent).toBe('horrible error')
  })
})
