import { RemoteGetDragons } from '@/data/usecases/get-dragons/remote-get-dragons'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { makeAPIUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-client-factory'

export const makeRemoteGetDragons = (): GetDragons => {
  return new RemoteGetDragons(makeAPIUrl('/dragon'), makeAxiosHttpClient())
}
