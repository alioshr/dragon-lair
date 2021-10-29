import { LocalGetAccessToken } from '@/data/usecases/get-access-token/local-get-access-token'
import { GetAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalGetAccessToken = (): GetAccessToken => {
  return new LocalGetAccessToken(makeLocalStorageAdapter())
}
