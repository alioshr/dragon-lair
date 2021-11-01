import faker from 'faker'
import { waitFor, fireEvent, screen } from '@testing-library/react'

export const testChildCount = async (
  testId: string,
  count: number
): Promise<void> => {
  const el = screen.getByTestId(testId)
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
  fieldName: string,
  wrapperStatus: string,
  errorMessage?: string
): void => {
  const wrapper = screen.getByTestId(`${fieldName}-wrapper`)
  const input = screen.getByTestId(`${fieldName}-input`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrapper.getAttribute('data-status')).toBe(wrapperStatus)
  expect(input.title).toBe(errorMessage ?? '')
  expect(label.title).toBe(errorMessage ?? '')
}

export const populateField = (
  fieldName: string,
  value: string = faker.random.word()
): void => {
  const emailInput = screen.getByTestId(`${fieldName}-input`)
  fireEvent.input(emailInput, { target: { value: value } })
}

export const clickElement = (testId: string): void => {
  const button = screen.getByTestId(testId)
  fireEvent.click(button)
}
