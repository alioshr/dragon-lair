import { SaveAccessToken } from '@/domain/usecases'

export class AccessTokenStub implements SaveAccessToken {
  async save (accessToken: string): Promise<void> {}
}
