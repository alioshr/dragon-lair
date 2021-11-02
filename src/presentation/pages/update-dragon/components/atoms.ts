import { atom } from 'recoil'

type StateTypes = {
  isLoading: boolean
  name: string
  type: string
  nameError: string
  typeError: string
  mainError: Error | null
  isFormInvalid: boolean
}

export const updateDragonState = atom<StateTypes>({
  key: 'updateDragonState',
  default: {
    name: '',
    type: '',
    isLoading: false,
    nameError: '',
    typeError: '',
    mainError: null,
    isFormInvalid: true
  }
})
