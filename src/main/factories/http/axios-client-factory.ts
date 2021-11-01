import { AxiosAdapter } from '@/infra/http/axios-adapter'

export const makeAxiosHttpClient = (): AxiosAdapter<any, any> => {
  return new AxiosAdapter<any, any>()
}
