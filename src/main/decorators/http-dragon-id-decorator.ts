import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'
import { Dragon } from '@/domain/models'

export class HttpDragonIdDecorator implements HttpClient {
  constructor (private readonly httpClient: HttpClient) {}

  async request (
    data: HttpRequest<null, string>
  ): Promise<HttpResponse<Dragon>> {
    data = {
      ...data,
      url: `${data.url}/${data.params as string}`,
      params: undefined
    }
    return await this.httpClient.request(data)
  }
}
