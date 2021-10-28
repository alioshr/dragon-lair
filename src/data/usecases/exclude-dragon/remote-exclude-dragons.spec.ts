import { HttpClientSpy, mockedUrl } from '@/data/tests'
import faker from 'faker'
import { ExcludeDragon } from '@/domain/usecases/exclude-dragon'
import { RemoteExcludeDragon } from './remote-exclude-dragons'

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
})
