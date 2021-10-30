import { GetAccessToken } from '@/domain/usecases'

export class GetAccessTokenStub implements GetAccessToken {
  get (): string {
    return 'token'
  }
}
