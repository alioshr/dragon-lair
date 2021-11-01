import { Dragon } from '@/domain/models'
import { AddDragon, AddDragonDTO } from '@/domain/usecases'

export class AddDragonSpy implements AddDragon {
  callCount = 0
  body: any
  constructor (private readonly dragon: Dragon) {}

  async add (data: AddDragonDTO): Promise<Dragon> {
    this.body = data
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragon)
  }
}
