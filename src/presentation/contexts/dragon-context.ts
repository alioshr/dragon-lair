import { Dragon } from '@/domain/models'
import { createContext, Dispatch, SetStateAction } from 'react'

export type StateTypes = {
  dragons: Dragon[]
  isLoading: boolean
  error: Error | null
  reload: boolean
  id: string | null
}

export type DragonStateTypes = {
  state: StateTypes
  setState: Dispatch<SetStateAction<StateTypes>>
}

export default createContext<DragonStateTypes>(null as any)
