import { Dragon } from '@/domain/models'
import { GetDragon } from '@/domain/usecases'

export class GetDragonSpy implements GetDragon {
  callCount = 0
  id: string | undefined = ''
  constructor (private readonly dragon: Dragon) {}

  async get (id: string): Promise<Dragon> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragon)
  }
}
