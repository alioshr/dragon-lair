import { HttpResponse } from './http-response'

export type methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type HttpRequest<RequestBody = any, Params = any> = {
  url: string
  method: methods
  body?: RequestBody
  headers?: any
  params?: Params
}

export interface HttpClient<RequestBody = any, ResponseBody = any, Params = any> {
  request: (data: HttpRequest<RequestBody, Params>) => Promise<HttpResponse<ResponseBody>>
}
