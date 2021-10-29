import { HttpStatusCode } from '@/data/protocols'
import { mockedUrl, HttpClientSpy } from '@/data/tests'
import { UnexpectedError } from '@/domain/errors'
import { mockedDragons, mockedUpdateDragonDTO } from '@/domain/test'
import { UpdateDragon } from '@/domain/usecases/update-dragon'
import { RemoteUpdateDragon } from './remote-update-dragon'

const URL = mockedUrl()
const UPDATE_PARAMS = mockedUpdateDragonDTO()

type SutTypes = {
  sut: UpdateDragon
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteUpdateDragon(URL, httpClientSpy)
  return { sut, httpClientSpy }
}

describe('RemoteUpdateDragon', () => {
  test('should call HttpClient with the correct params', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.update(UPDATE_PARAMS)
    expect(httpClientSpy.url).toBe(URL)
    expect(httpClientSpy.method).toBe('PUT')
    expect(httpClientSpy.body).toEqual(UPDATE_PARAMS.body)
  })
  test('should throw Unexpected error HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest }
    const promise = sut.update(UPDATE_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound }
    const promise = sut.update(UPDATE_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should throw Unexpected error HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError }
    const promise = sut.update(UPDATE_PARAMS)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('should return dragons on success (200)', async () => {
    const { sut, httpClientSpy } = makeSut()
    const responseBody = mockedDragons()[0]
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody
    }
    const httpResponse = await sut.update(UPDATE_PARAMS)
    expect(httpResponse).toEqual(responseBody)
  })
})
