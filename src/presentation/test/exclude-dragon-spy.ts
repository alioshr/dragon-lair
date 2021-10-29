import { Dragon } from '@/domain/models'
import { mockedDragons } from '@/domain/test'
import { ExcludeDragon } from '@/domain/usecases'

export class ExcludeDragonSpy implements ExcludeDragon {
  callCount = 0
  id: string | undefined = ''
  dragon = mockedDragons()[0]
  async delete (id: string): Promise<Dragon> {
    this.id = id
    this.callCount = this.callCount + 1
    return await Promise.resolve(this.dragon)
  }
}
