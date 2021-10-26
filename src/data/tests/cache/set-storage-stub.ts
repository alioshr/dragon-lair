import { SetStorage } from '../../protocols/cache/set-storage'

export const makeSetStorage = (): SetStorage => {
  class SetStorageStub implements SetStorage {
    async set (keyName: string, data: string): Promise<void> {}
  }
  return new SetStorageStub()
}
