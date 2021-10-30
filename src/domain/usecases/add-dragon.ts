import { Dragon } from '../models'

export type AddDragonDTO = {
  name: string
  type: string
}

export interface AddDragon {
  update: (data: AddDragonDTO) => Promise<Dragon>
}
