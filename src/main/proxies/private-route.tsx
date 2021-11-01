import { RouteProps, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { currentAccountState } from '@/presentation/components'
import { useRecoilValue } from 'recoil'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return getCurrentAccount()
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} />
}

export default PrivateRoute
