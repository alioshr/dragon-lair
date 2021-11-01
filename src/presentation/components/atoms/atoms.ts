
import { atom } from 'recoil'

type AccountTypes = {
  getCurrentAccount: () => string
  setCurrentAccount: (accessToken: string) => Promise<void>
}

export const currentAccountState = atom<AccountTypes>({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as unknown as () => string,
    setCurrentAccount: null as unknown as (accessToken: string) => Promise<void>
  }
})

type HeaderTypes = {
  isSidebarOpen: boolean
  user: string | null
}

export const headerState = atom<HeaderTypes>({
  key: 'headerState',
  default: {
    isSidebarOpen: false,
    user: null
  }
})
