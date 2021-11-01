import { currentAccountState } from '@/presentation/components'

import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  return async (): Promise<void> => {
    await setCurrentAccount(null as any)
    history.replace('/login')
  }
}
