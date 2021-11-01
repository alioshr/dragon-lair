import { Dragon } from '@/domain/models'
import { atom } from 'recoil'

export type StateTypes = {
  dragons: Dragon[]
  isLoading: boolean
  error: Error | null
  reload: boolean
  id: string | null
}

export const dragonListState = atom<StateTypes>({
  key: 'dragonListState',
  default: {
    dragons: [],
    isLoading: false,
    error: null,
    reload: false,
    id: null
  }
})
