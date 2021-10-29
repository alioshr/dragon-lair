import { createContext, Dispatch, SetStateAction } from 'react'

export type StateTypes = {
  name: string
  type: string
  isLoading: boolean
}

export type ErrorStateTypes = {
  name: string | null
  type: string | null
  main: string | null
}

export type UpdateDragonStateTypes = {
  state: [StateTypes, Dispatch<SetStateAction<StateTypes>>]
  errorState: [ErrorStateTypes, Dispatch<SetStateAction<ErrorStateTypes>>]
}

export default createContext<UpdateDragonStateTypes>(null as any)
