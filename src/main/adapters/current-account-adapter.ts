import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = async (account: string): Promise<void> => {
  await makeLocalStorageAdapter().set('access_token', account)
}

export const getCurrentAccountAdapter = (): string => {
  return makeLocalStorageAdapter().get('access_token')
}
