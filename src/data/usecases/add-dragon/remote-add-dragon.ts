import { HttpClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { AddDragon, AddDragonDTO } from '@/domain/usecases'

export class RemoteAddDragon implements AddDragon {
  constructor (private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add (data: AddDragonDTO): Promise<Dragon> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'POST',
      body: data
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
