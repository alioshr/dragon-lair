import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { UpdateDragon, UpdateDragonDTO } from '@/domain/usecases/update-dragon'

export class RemoteUpdateDragon implements UpdateDragon {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async update (data: UpdateDragonDTO): Promise<Dragon> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'PUT',
      body: data.body,
      params: data.id
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
