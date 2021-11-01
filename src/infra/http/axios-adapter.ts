import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols'
import axios from 'axios'

export class AxiosAdapter<RequestBody, ResponseBody>
implements HttpClient {
  async request (
    data: HttpRequest<RequestBody>
  ): Promise<HttpResponse<ResponseBody>> {
    try {
      const response = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
      return {
        statusCode: response.status,
        body: response.data
      }
    } catch (error: any) {
      return {
        statusCode: error.response.status,
        body: error.response.data
      }
    }
  }
}
