import { Dragon } from '../models'

export type UpdateDragonTypes = {
  name: string
  type: string
}

type UpdateDragonDTO = {
  id: string
  body: UpdateDragonTypes
}

export interface UpdateDragon {
  update: (data: UpdateDragonDTO) => Promise<Dragon>
}
