import { Dragon } from '@/domain/models'

export interface GetDragons {
  get: (id?: string) => Promise<Dragon[]>
}
