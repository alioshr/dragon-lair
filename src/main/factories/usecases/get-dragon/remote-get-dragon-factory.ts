import { RemoteGetDragon } from '@/data/usecases/get-dragon/remote-get-dragon'
import { GetDragon } from '@/domain/usecases'
import { HttpDragonIdDecorator } from '@/main/decorators/http-dragon-id-decorator'
import { makeAPIUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-client-factory'

export const makeRemoteGetDragon = (): GetDragon => {
  return new RemoteGetDragon(makeAPIUrl('/dragon'), new HttpDragonIdDecorator(makeAxiosHttpClient()))
}
