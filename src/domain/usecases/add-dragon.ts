import { Dragon } from '../models'

export type AddDragonDTO = {
  name: string
  type: string
}

export interface AddDragon {
  add: (data: AddDragonDTO) => Promise<Dragon>
}
