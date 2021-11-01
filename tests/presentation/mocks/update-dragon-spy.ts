import { Dragon } from '@/domain/models'
import { UpdateDragon, UpdateDragonDTO } from '@/domain/usecases/update-dragon'

export class UpdateDragonSpy implements UpdateDragon {
  callCount = 0
  body: any
  id: string | undefined = ''
  constructor (private readonly dragon: Dragon) {}

  async update (data: UpdateDragonDTO): Promise<Dragon> {
    this.id = data.id
    this.body = data.body
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragon)
  }
}
