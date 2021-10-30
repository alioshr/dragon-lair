import { LocalDeleteAccessToken } from '@/data/usecases/delete-access-token/local-delete-access-token'
import { DeleteAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalDeleteAccessToken = (): DeleteAccessToken => {
  return new LocalDeleteAccessToken(makeLocalStorageAdapter())
}
