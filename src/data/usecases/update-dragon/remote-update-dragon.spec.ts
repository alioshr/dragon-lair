import { mockedUrl, HttpClientSpy } from '@/data/tests'
import { mockedUpdateDragonDTO } from '@/domain/test'
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
})
