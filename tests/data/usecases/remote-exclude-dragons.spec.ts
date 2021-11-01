import { UnexpectedError } from '@/domain/errors'
import { mockedDragons } from '@/../tests/domain/mocks'
import { ExcludeDragon } from '@/domain/usecases'
import faker from 'faker'
import { mockedUrl, HttpClientSpy } from '../mocks'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteExcludeDragon } from '@/data/usecases/remote-exclude-dragons'

const URL = mockedUrl()

type SutTypes = {
  sut: ExcludeDragon
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteExcludeDragon(URL, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteGetDragons', () => {
  test('should call HttpClient with the correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    const id = faker.datatype.uuid()
    await sut.delete(id)
    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('DELETE')
  })
  test('should call HttpClient with the correct params', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = faker.datatype.uuid()
    await sut.delete(params)
    expect(httpClientSpy.params).toBe(params)
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const params = faker.datatype.uuid()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const params = faker.datatype.uuid()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const params = faker.datatype.uuid()
    const promise = sut.delete(params)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return the excluded Dragon on success (200)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = faker.datatype.uuid()
    const responseBody = mockedDragons()[0]
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody
    }
    const httpResponse = await sut.delete(params)
    expect(httpResponse).toEqual(responseBody)
  })
})
