import { RemoveStorage } from '@/data/protocols'
import { DeleteAccessToken } from '@/domain/usecases'

export class LocalDeleteAccessToken implements DeleteAccessToken {
  constructor (private readonly removeStorage: RemoveStorage) {}
  async delete (): Promise<void> {
    this.removeStorage.delete('access_token')
  }
}
