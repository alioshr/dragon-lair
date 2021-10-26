import { SetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage {
  async set (keyName: string, data: string): Promise<void> {
    localStorage.setItem(keyName, JSON.stringify(data))
  }
}
