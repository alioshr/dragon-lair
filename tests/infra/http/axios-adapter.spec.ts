import { HttpRequest } from '@/data/protocols'
import axios from 'axios'
import { mockedHttpResponse, mockedUrl, mockedBody, mockedHttpRequest, mockedHeaders } from '../../data/mocks'
import { mockedAxiosResponse } from '../mocks'
import { AxiosAdapter } from '@/infra/http/axios-adapter'

jest.mock('axios', () => ({
  request: () => mockedAxiosResponse(mockedHttpResponse)
}))

const URL = mockedUrl()
const BODY = mockedBody()
const REQUEST_PARAMS = mockedHttpRequest({
  url: URL,
  body: BODY,
  method: 'POST',
  headers: mockedHeaders()
})

type SutTypes = {
  sut: AxiosAdapter<any, any>
}

const makeSut = (requestParams?: HttpRequest): SutTypes => {
  const sut = new AxiosAdapter()
  return { sut }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with the correct params on post', async () => {
    const { sut } = makeSut()
    const postSpy = jest.spyOn(axios, 'request')
    await sut.request(REQUEST_PARAMS)
    expect(postSpy).toHaveBeenCalledWith({
      url: REQUEST_PARAMS.url,
      method: REQUEST_PARAMS.method,
      data: REQUEST_PARAMS.body,
      headers: REQUEST_PARAMS.headers
    })
  })
  test('Should return a proper HttpResponse on success on post', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.request(REQUEST_PARAMS)
    expect(httpResponse).toEqual(mockedHttpResponse)
  })
  test('Should return a proper HttpResponse on failure', async () => {
    const { sut } = makeSut()
    jest.spyOn(axios, 'request').mockRejectedValueOnce({
      response: mockedAxiosResponse(mockedHttpResponse)
    })
    const result = await sut.request(REQUEST_PARAMS)
    expect(result).toEqual({
      statusCode: mockedHttpResponse.statusCode,
      body: mockedHttpResponse.body
    })
  })
})
