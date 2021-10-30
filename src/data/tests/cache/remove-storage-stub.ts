import { RemoveStorage } from '@/data/protocols'
import faker from 'faker'

export class RemoveStorageSpy implements RemoveStorage {
  keyName = ''
  constructor (private readonly token: string = faker.datatype.uuid()) {}
  async delete (keyName: string): Promise<void> {
    this.keyName = keyName
  }
}
