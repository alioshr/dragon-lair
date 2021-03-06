import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { NotFoundError, UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { ExcludeDragon } from '@/domain/usecases/exclude-dragon'

export class RemoteExcludeDragon implements ExcludeDragon {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete (id: string): Promise<Dragon> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'DELETE',
      params: id
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new UnexpectedError()
    }
  }
}
