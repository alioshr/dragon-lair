import { RemoteAddDragon } from '@/data/usecases/remote-add-dragon'
import { AddDragon } from '@/domain/usecases'
import { makeAPIUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-client-factory'

export const makeRemoteAddDragon = (): AddDragon => {
  return new RemoteAddDragon(makeAPIUrl('/dragon'), makeAxiosHttpClient())
}
