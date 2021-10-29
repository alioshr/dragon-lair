import React from 'react'
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from '@testing-library/react'
import { Dragons } from '..'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { Dragon } from '@/domain/models'
import { mockedDragons } from '@/domain/test'
import { ExcludeDragon } from '@/domain/usecases'

const DRAGONS = mockedDragons()

class GetDragonsSpy implements GetDragons {
  callCount = 0
  id: string | undefined = ''
  dragons = DRAGONS
  async get (id?: string): Promise<Dragon[]> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragons)
  }
}

class ExcludeDragonSpy implements ExcludeDragon {
  callCount = 0
  id: string | undefined = ''
  dragon = mockedDragons()[0]
  async delete (id: string): Promise<Dragon> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragon)
  }
}

type SutTypes = {
  sut: RenderResult
  getDragonsSpy: GetDragonsSpy
  excludeDragonSpy: ExcludeDragonSpy
}

const makeSut = (
  getDragonsSpy = new GetDragonsSpy(),
  excludeDragonSpy = new ExcludeDragonSpy()
): SutTypes => {
  const sut = render(
    <Dragons excludeDragon={excludeDragonSpy} getDragons={getDragonsSpy} />
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
    const getDragonsSpy = new GetDragonsSpy()
    jest
      .spyOn(getDragonsSpy, 'get')
      .mockRejectedValueOnce(new Error('horrible error'))
    makeSut(getDragonsSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    expect(screen.getByTestId('error')).toBeTruthy()
  })
  test('Should call GetDragons on reload', async () => {
    const getDragonsSpy = new GetDragonsSpy()
    jest
      .spyOn(getDragonsSpy, 'get')
      .mockRejectedValueOnce(new Error('horrible error'))
    makeSut(getDragonsSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    fireEvent.click(screen.getByTestId('reload'))
    expect(getDragonsSpy.callCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
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
    const spinners = dragonList.querySelectorAll('svg.spinner')
    expect(spinners.length).toBe(1)
    const excludeButtons = dragonList.querySelectorAll('svg.exclude')
    expect(excludeButtons.length).toBe(2)
  })
  test('Should remove dragon from list if exclusion succeeds', async () => {
    makeSut()
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    const excludeButton = screen.getByTestId(`exclude-${DRAGONS[0].id}`)
    fireEvent.click(excludeButton)
    await waitFor(() => dragonList)
    const dragons = dragonList.querySelectorAll('div.dragonContent')
    expect(dragons.length).toBe(2)
  })
})
