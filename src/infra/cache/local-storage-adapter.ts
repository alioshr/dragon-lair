import { GetStorage, RemoveStorage, SetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage, GetStorage, RemoveStorage {
  async set (keyName: string, data: string): Promise<void> {
    localStorage.setItem(keyName, JSON.stringify(data))
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key) as string)
  }

  delete (key: string): void {
    localStorage.removeItem(key)
  }
}
