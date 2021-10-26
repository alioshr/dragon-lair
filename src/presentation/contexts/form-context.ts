import { createContext, Dispatch, SetStateAction } from 'react'

export type StateTypes = {
  password: string
  name: string
}

export type ErrorStateTypes = {
  password: string | null
  name: string | null
  main: string | null
}

export type FormStateTypes = {
  formState: [StateTypes, Dispatch<SetStateAction<StateTypes>>]
  errorState: [ErrorStateTypes, Dispatch<SetStateAction<ErrorStateTypes>>]
}

export default createContext<FormStateTypes>(null as any)
