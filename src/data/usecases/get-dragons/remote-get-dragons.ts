import { HttpClient } from '@/data/protocols'
import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases/get-dragons'

export class RemoteGetDragons implements GetDragons {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get (id?: string): Promise<Dragon[]> {
    await this.httpClient.request({
      url: this.url,
      method: 'GET',
      params: id
    })
    return await Promise.resolve(null as any)
  }
}
