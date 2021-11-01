import { atom } from 'recoil'

type StateTypes = {
  isLoading: boolean
  name: string
  password: string
  nameError: string
  passwordError: string
  mainError: string
}

export const loginState = atom<StateTypes>({
  key: 'loginState',
  default: {
    isLoading: false,
    name: '',
    password: '',
    nameError: '',
    passwordError: '',
    mainError: ''
  }
})
