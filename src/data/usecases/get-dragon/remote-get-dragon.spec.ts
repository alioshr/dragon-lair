import { HttpClientSpy, mockedUrl } from '@/data/tests'
import { RemoteGetDragon } from './remote-get-dragon'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols'
import { mockedDragons } from '@/domain/test'
import { GetDragon } from '@/domain/usecases'
import faker from 'faker'

const URL = mockedUrl()

type SutTypes = {
  sut: GetDragon
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteGetDragon(URL, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteGetDragons', () => {
  test('should call HttpClient with the correct params', async () => {
    const { sut, httpClientSpy } = makeSut()
    const id = faker.datatype.uuid()
    await sut.get(id)
    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('GET')
    expect(httpClientSpy.params).toBe(id)
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const id = faker.datatype.uuid()
    const promise = sut.get(id)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const id = faker.datatype.uuid()
    const promise = sut.get(id)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const id = faker.datatype.uuid()
    const promise = sut.get(id)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return dragons on success (200)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const responseBody = mockedDragons()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody
    }
    const id = faker.datatype.uuid()
    const httpResponse = await sut.get(id)
    expect(httpResponse).toEqual(responseBody)
  })
})
