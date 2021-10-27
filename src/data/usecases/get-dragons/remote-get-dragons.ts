import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases/get-dragons'

export class RemoteGetDragons implements GetDragons {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async get (id?: string): Promise<Dragon[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
      params: id
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
