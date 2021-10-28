import { HttpClient } from '@/data/protocols'
import { ExcludeDragon } from '@/domain/usecases/exclude-dragon'

export class RemoteExcludeDragon implements ExcludeDragon {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete (id: string): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: 'DELETE',
      params: id
    })
    return await Promise.resolve(null as any)
  }
}
