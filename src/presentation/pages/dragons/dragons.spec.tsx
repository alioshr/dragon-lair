import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Dragons } from '..'

type SutTypes = {
  sut: RenderResult

}
const makeSut = (): SutTypes => {
  const sut = render(<Dragons />)
  return { sut }
}
describe('Dragons', () => {
  test('Should load 4 skeletons initially', () => {
    const { sut } = makeSut()
    const dragonList = sut.getByTestId('dragons-list')
    const skeletons = dragonList.querySelectorAll('li:empty')
    expect(skeletons.length).toBe(4)
  })
})
