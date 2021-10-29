import { GetStorageSpy } from '@/data/tests/cache/get-storage-stub'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { GetAccessToken } from '@/domain/usecases'
import { LocalGetAccessToken } from './local-get-access-token'
import faker from 'faker'

type SutTypes = {
  sut: GetAccessToken
  getStorageSpy: GetStorageSpy
}

const makeSut = (token?: string): SutTypes => {
  const getStorageSpy = new GetStorageSpy(token)
  const sut = new LocalGetAccessToken(getStorageSpy)
  return { sut, getStorageSpy }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with the correct values', async () => {
    const { sut, getStorageSpy } = makeSut()
    const setSpy = jest.spyOn(getStorageSpy, 'get')
    await sut.get()
    expect(setSpy).toHaveBeenCalledWith('access_token')
  })
  test('should throw if accessToken is undefined', async () => {
    const { sut, getStorageSpy } = makeSut()
    const error = new UnexpectedError()
    jest.spyOn(getStorageSpy, 'get').mockRejectedValueOnce(error)
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return a token in case of success', async () => {
    const token = faker.datatype.uuid()
    const { sut } = makeSut(token)
    const storageResponse = await sut.get()
    expect(storageResponse).toBe(token)
  })
})
