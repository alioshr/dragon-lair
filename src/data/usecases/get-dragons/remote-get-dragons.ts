import { HttpClient } from '@/data/protocols'
import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases/get-dragons'

export class RemoteGetDragons implements GetDragons {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get (id?: number): Promise<Dragon[]> {
    await this.httpClient.request({
      url: this.url,
      method: 'GET'
    })
    return await Promise.resolve(null as any)
  }
}
