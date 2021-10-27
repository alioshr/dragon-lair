import { HttpClientSpy, mockedUrl } from '@/data/tests'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { RemoteGetDragons } from './remote-get-dragons'

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
})
