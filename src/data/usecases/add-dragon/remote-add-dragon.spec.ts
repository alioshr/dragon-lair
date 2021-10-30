import { HttpStatusCode } from '@/data/protocols'
import { mockedUrl, HttpClientSpy } from '@/data/tests'
import { UnexpectedError } from '@/domain/errors'
import { mockedAddDragonDTO, mockedDragons } from '@/domain/test'
import { AddDragon } from '@/domain/usecases'
import { RemoteAddDragon } from './remote-add-dragon'

const URL = mockedUrl()
const ADD_PARAMS = mockedAddDragonDTO()

type SutTypes = {
  sut: AddDragon
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteAddDragon(URL, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteAddDragon', () => {
  test('should call HttpClient with the correct params', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.created }
    await sut.add(ADD_PARAMS)
    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('POST')
    expect(httpClientSpy.body).toEqual(ADD_PARAMS)
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const promise = sut.add(ADD_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const promise = sut.add(ADD_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const promise = sut.add(ADD_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return a dragon on success (201)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const responseBody = mockedDragons()[0]
    httpClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: responseBody
    }
    const httpResponse = await sut.add(ADD_PARAMS)
    expect(httpResponse).toEqual(responseBody)
  })
})
