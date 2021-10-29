import { HttpClientSpy, mockedUrl } from '@/data/tests'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { RemoteGetDragons } from './remote-get-dragons'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { mockedDragons } from '@/domain/test'

const URL = mockedUrl()

type SutTypes = {
  sut: GetDragons
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteGetDragons(URL, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteGetDragons', () => {
  test('should call HttpClient with the correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.get()
    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('GET')
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const promise = sut.get()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return dragons on success (200)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const responseBody = mockedDragons()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody
    }
    const httpResponse = await sut.get()
    expect(httpResponse).toEqual(responseBody)
  })
})
