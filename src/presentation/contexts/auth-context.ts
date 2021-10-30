import { createContext, Dispatch, SetStateAction } from 'react'

export type StateTypes = {
  isAuth: boolean
  user: string | null | undefined
  open: boolean
}

export type AuthStateTypes = {
  state: StateTypes
  setState: Dispatch<SetStateAction<StateTypes>>
}

export default createContext<AuthStateTypes>(null as any)
