import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases'

export class GetDragonsSpy implements GetDragons {
  callCount = 0
  id: string | undefined = ''
  constructor (private readonly dragons: Dragon[]) {}

  async get (id?: string): Promise<Dragon[]> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragons)
  }
}
