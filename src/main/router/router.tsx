import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import PrivateRoute from '../proxies/private-route'
import { makeLocalGetAccessToken } from '../factories/usecases/get-access-token/local-get-access-token-factory'
import { makeLocalDeleteAccessToken } from '../factories/usecases/remove-access-token/local-remove-access-token-factory'
import { Header } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
  makeDragons: React.FC
  updateDragon: React.FC
  detailsPage: React.FC
  addDragon: React.FC
}

const Router: React.FC<Props> = ({
  makeLogin,
  makeDragons,
  updateDragon,
  detailsPage,
  addDragon
}) => {
  return (
    <BrowserRouter>
      <Header
        getAccessToken={makeLocalGetAccessToken()}
        deleteAccessToken={makeLocalDeleteAccessToken()}
      >
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <PrivateRoute path="/" exact component={makeDragons} />
          <PrivateRoute path="/update/:id" exact component={updateDragon} />
          <PrivateRoute path="/details/:id" exact component={detailsPage} />
          <PrivateRoute path="/new" exact component={addDragon} />
        </Switch>
      </Header>
    </BrowserRouter>
  )
}

export default Router
