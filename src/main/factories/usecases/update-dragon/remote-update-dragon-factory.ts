import { RemoteUpdateDragon } from '@/data/usecases/update-dragon/remote-update-dragon'
import { UpdateDragon } from '@/domain/usecases/update-dragon'
import { HttpDragonIdDecorator } from '@/main/decorators/http-dragon-id-decorator'
import { makeAPIUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-client-factory'

export const makeRemoteUpdateDragon = (): UpdateDragon => {
  return new RemoteUpdateDragon(makeAPIUrl('/dragon'), new HttpDragonIdDecorator(makeAxiosHttpClient()))
}
