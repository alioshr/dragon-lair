import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { ExcludeDragon } from '@/domain/usecases/exclude-dragon'

export class RemoteExcludeDragon implements ExcludeDragon {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async delete (id: string): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'DELETE',
      params: id
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
