import { HttpResponse, HttpStatusCode } from '@/data/protocols'
import { HttpClient, HttpRequest } from '@/data/protocols/http/http-client'

export class HttpClientSpy implements HttpClient {
  url: string = ''
  method: string = ''
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (params: HttpRequest): Promise<HttpResponse> {
    this.url = params.url
    this.method = params.method
    return this.response
  }
}
