import 'jest-localstorage-mock'
import faker from 'faker'
import { SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from './local-storage-adapter'

type SutTypes = {
  sut: SetStorage
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter()
  return { sut }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('should call localStorage with the correct params', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
})