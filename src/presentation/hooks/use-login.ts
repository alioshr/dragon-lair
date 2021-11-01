import { currentAccountState, headerState } from '@/presentation/components'

import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogin = (user: string): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [, setState] = useRecoilState(headerState)
  return async () => {
    await setCurrentAccount(user)
    setState((old) => ({ ...old, user }))
    history.replace('/')
  }
}
