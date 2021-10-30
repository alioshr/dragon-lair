import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { DeleteAccessToken } from '@/domain/usecases'
import { LocalDeleteAccessToken } from './local-delete-access-token'
import { RemoveStorageSpy } from '@/data/tests/cache/remove-storage-stub'

type SutTypes = {
  sut: DeleteAccessToken
  removeStorageSpy: RemoveStorageSpy
}

const makeSut = (token?: string): SutTypes => {
  const removeStorageSpy = new RemoveStorageSpy(token)
  const sut = new LocalDeleteAccessToken(removeStorageSpy)
  return { sut, removeStorageSpy }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with the correct values', async () => {
    const { sut, removeStorageSpy } = makeSut()
    const setSpy = jest.spyOn(removeStorageSpy, 'delete')
    await sut.delete()
    expect(setSpy).toHaveBeenCalledWith('access_token')
  })
  test.skip('should throw if accessToken is undefined', async () => {
    const { sut, removeStorageSpy } = makeSut()
    const error = new UnexpectedError()
    jest.spyOn(removeStorageSpy, 'delete').mockRejectedValueOnce(error)
    const promise = sut.delete()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
