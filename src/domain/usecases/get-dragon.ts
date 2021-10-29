import { Dragon } from '@/domain/models'

export interface GetDragon {
  get: (id: string) => Promise<Dragon>
}
