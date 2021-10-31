import { NoContentError } from '@/domain/errors'
import { Dragon } from '@/domain/models'
import { GetDragons } from '@/domain/usecases'

export class DragonListDecorator implements GetDragons {
  constructor (private readonly getDragons: GetDragons) {}
  async get (): Promise<Dragon[]> {
    const dragons = await this.getDragons.get()
    switch (true) {
      case dragons.length > 0 :
        return dragons.sort((a, b) => a.name.localeCompare(b.name))
      default:
        throw new NoContentError()
    }
  }
}
