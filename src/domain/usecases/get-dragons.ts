import { Dragon } from '@/domain/models'

export interface GetDragons {
  get: () => Promise<Dragon[]>
}
