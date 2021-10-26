import { SetStorage } from '@/data/protocols/cache/set-storage'
import { makeSetStorage } from '@/data/tests'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: SaveAccessToken
  setStorageStub: SetStorage
}

const makeSut = (): SutTypes => {
  const setStorageStub = makeSetStorage()
  const sut = new LocalSaveAccessToken(setStorageStub)
  return { sut, setStorageStub }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with the correct values', async () => {
    const { sut, setStorageStub } = makeSut()
    const setSpy = jest.spyOn(setStorageStub, 'set')
    await sut.save('valid_token')
    expect(setSpy).toHaveBeenCalledWith('access_token', 'valid_token')
  })
  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageStub } = makeSut()
    const error = new Error('!!')
    jest.spyOn(setStorageStub, 'set').mockRejectedValueOnce(error)
    const promise = sut.save('valid_token')
    await expect(promise).rejects.toThrow(error)
  })
  test('should throw if accessToken is undefined', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined as any)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
