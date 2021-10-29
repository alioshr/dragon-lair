import { GetStorage } from '@/data/protocols'
import faker from 'faker'

export class GetStorageSpy implements GetStorage {
  keyName = ''
  constructor (private readonly token: string = faker.datatype.uuid()) {}
  async get (keyName: string): Promise<string> {
    this.keyName = keyName
    return await Promise.resolve(this.token)
  }
}
