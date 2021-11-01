
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as unknown as () => string,
    setCurrentAccount: null as unknown as (accessToken: string) => Promise<void>
  }
})

export const sidebarState = atom<{open: boolean}>({
  key: 'sidebarState',
  default: {
    open: false
  }
})
