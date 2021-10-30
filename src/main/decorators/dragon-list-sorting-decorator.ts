import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases'

export class DragonListSortingDecorator implements GetDragons {
  constructor (private readonly getDragons: GetDragons) {}
  async get (): Promise<Dragon[]> {
    const dragons = await this.getDragons.get()
    return dragons.sort((a, b) => a.name.localeCompare(b.name))
  }
}
