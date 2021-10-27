import { HttpClientSpy, mockedUrl } from '@/data/tests'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { RemoteGetDragons } from './remote-get-dragons'
import faker from 'faker'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'

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
  test('should call HttpClient with the correct params', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = faker.datatype.uuid()
    await sut.get(params)
    expect(httpClientSpy.params).toBe(params)
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const params = faker.datatype.uuid()
    const promise = sut.get(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const params = faker.datatype.uuid()
    const promise = sut.get(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const params = faker.datatype.uuid()
    const promise = sut.get(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
