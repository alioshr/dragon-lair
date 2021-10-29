import { RouteProps, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { makeLocalGetAccessToken } from '../factories/usecases/get-access-token/local-get-access-token-factory'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  try {
    makeLocalGetAccessToken().get()
    return <Route {...props} />
  } catch (err) {
    return <Route {...props} component={() => <Redirect to="/login" />} />
  }
}

export default PrivateRoute
