import React from 'react'
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import { Dragons } from '..'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { Dragon } from '@/domain/models'
import { mockedDragons } from '@/domain/test'

class GetDragonsSpy implements GetDragons {
  callCount = 0
  id: string | undefined = ''
  dragons = mockedDragons()
  async get (id?: string): Promise<Dragon[]> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragons)
  }
}

type SutTypes = {
  sut: RenderResult
  getDragonsSpy: GetDragonsSpy

}
const makeSut = (getDragonsSpy = new GetDragonsSpy()): SutTypes => {
  const sut = render(<Dragons getDragons={getDragonsSpy}/>)
  return { sut, getDragonsSpy }
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
    const getDragonSpy = new GetDragonsSpy()
    jest.spyOn(getDragonSpy, 'get').mockRejectedValueOnce(new Error('horrible error'))
    makeSut(getDragonSpy)
    const dragonList = screen.getByTestId('dragons-list')
    await waitFor(() => dragonList)
    expect(screen.getByTestId('error')).toBeTruthy()
  })
})
