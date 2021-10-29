import { HttpClient } from '@/data/protocols'
import { Dragon } from '@/domain/models'
import { UpdateDragon, UpdateDragonDTO } from '@/domain/usecases/update-dragon'

export class RemoteUpdateDragon implements UpdateDragon {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update (data: UpdateDragonDTO): Promise<Dragon> {
    await this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: data.body,
      params: data.id
    })
    return await Promise.resolve(null as any)
  }
}
