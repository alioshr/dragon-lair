import { HttpResponse, HttpStatusCode } from '@/data/protocols'
import { HttpClient, HttpRequest } from '@/data/protocols/http/http-client'

export class HttpClientSpy implements HttpClient {
  url: string = ''
  method: string = ''
  params: any = null
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse> {
    this.url = data.url
    this.method = data.method
    this.params = data.params
    return this.response
  }
}
