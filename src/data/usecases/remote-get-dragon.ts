import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { GetDragon } from '@/domain/usecases'

export class RemoteGetDragon implements GetDragon {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get (id: string): Promise<Dragon> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
      params: id
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new UnexpectedError()
    }
  }
}
