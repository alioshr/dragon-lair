export interface SetStorage {
  set: (keyName: string, data: string) => Promise<void>
}
