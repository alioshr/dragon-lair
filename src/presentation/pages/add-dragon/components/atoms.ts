import { atom } from 'recoil'

type StateTypes = {
  isLoading: boolean
  name: string
  type: string
  nameError: string
  typeError: string
  mainError: string
  isFormInvalid: boolean
}

export const addDragonState = atom<StateTypes>({
  key: 'addDragonState',
  default: {
    name: '',
    type: '',
    isLoading: false,
    nameError: '',
    typeError: '',
    mainError: '',
    isFormInvalid: true
  }
})
