import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases'

export class GetDragonsSpy implements GetDragons {
  callCount = 0
  constructor (private readonly dragons: Dragon[]) {}

  async get (): Promise<Dragon[]> {
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragons)
  }
}
