import { Dragon } from '../models'

export interface ExcludeDragon {
  delete: (id: string) => Promise<Dragon>
}
