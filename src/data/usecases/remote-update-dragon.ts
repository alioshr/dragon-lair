import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { UpdateDragon, UpdateDragonDTO } from '@/domain/usecases'

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
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new UnexpectedError()
    }
  }
}
