import { HttpClientSpy, mockedUrl } from '@/data/tests'
import faker from 'faker'
import { ExcludeDragon } from '@/domain/usecases/exclude-dragon'
import { RemoteExcludeDragon } from './remote-exclude-dragons'
import { HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

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
})
