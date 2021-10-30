import { DeleteAccessToken } from '@/domain/usecases'

export class DeleteAccessTokenStub implements DeleteAccessToken {
  async delete (): Promise<void> {}
}
