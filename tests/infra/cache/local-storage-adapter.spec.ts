import 'jest-localstorage-mock'
import faker from 'faker'
import { GetStorage, SetStorage } from '@/data/protocols'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

type SutTypes = {
  sut: SetStorage & GetStorage
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdapter()
  return { sut }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('should call set localStorage with the correct params', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })
  test('should call get localStorage with the correct params', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    await sut.get(key)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })
})
