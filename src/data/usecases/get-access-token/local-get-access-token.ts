import { GetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { GetAccessToken } from '@/domain/usecases'

export class LocalGetAccessToken implements GetAccessToken {
  constructor (private readonly getStorage: GetStorage) {}
  get (): string {
    const token = this.getStorage.get('access_token')
    if (!token) {
      throw new UnexpectedError()
    }
    return token
  }
}
