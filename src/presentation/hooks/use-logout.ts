import { currentAccountState, headerState } from '@/presentation/components'

import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [, setState] = useRecoilState(headerState)
  return async (): Promise<void> => {
    await setCurrentAccount(null as any)
    setState((old) => ({ ...old, user: null }))
    history.replace('/login')
  }
}
