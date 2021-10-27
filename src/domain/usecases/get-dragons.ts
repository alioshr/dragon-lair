import { Dragon } from '@/domain/models'

export interface GetDragons {
  get: (id?: number) => Promise<Dragon[]>
}
