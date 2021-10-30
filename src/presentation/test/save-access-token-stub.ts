import { SaveAccessToken } from '@/domain/usecases'

export class SaveAccessTokenStub implements SaveAccessToken {
  async save (accessToken: string): Promise<void> {}
}
