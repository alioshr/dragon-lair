import faker from 'faker'
import { RenderResult, waitFor, fireEvent, screen } from '@testing-library/react'

export const testChildCount = async (
  sut: RenderResult,
  testId: string,
  count: number
): Promise<void> => {
  const el = sut.getByTestId(testId)
  await waitFor(() => el)
  expect(el.childElementCount).toBe(count)
}

export const testButtonDisabled = (
  testId: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(testId)
  expect((button as HTMLButtonElement).disabled).toBe(isDisabled)
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  wrapperStatus: string,
  errorMessage?: string
): void => {
  const wrapper = sut.getByTestId(`${fieldName}-wrapper`)
  const input = sut.getByTestId(`${fieldName}-input`)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrapper.getAttribute('data-status')).toBe(wrapperStatus)
  expect(input.title).toBe(errorMessage ?? '')
  expect(label.title).toBe(errorMessage ?? '')
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value: string = faker.random.word()
): void => {
  const emailInput = sut.getByTestId(`${fieldName}-input`)
  fireEvent.input(emailInput, { target: { value: value } })
}

export const clickElement = (sut: RenderResult, testId: string): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement | HTMLLinkElement
  fireEvent.click(button)
}
