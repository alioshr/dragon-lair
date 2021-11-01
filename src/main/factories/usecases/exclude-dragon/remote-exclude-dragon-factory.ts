import { RemoteExcludeDragon } from '@/data/usecases/remote-exclude-dragons'
import { ExcludeDragon } from '@/domain/usecases'
import { HttpDragonIdDecorator } from '@/main/decorators/http-dragon-id-decorator'
import { makeAPIUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-client-factory'

export const makeRemoteExcludeDragon = (): ExcludeDragon => {
  return new RemoteExcludeDragon(makeAPIUrl('/dragon'), new HttpDragonIdDecorator(makeAxiosHttpClient()))
}
