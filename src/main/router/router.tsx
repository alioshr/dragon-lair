import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import PrivateRoute from '../proxies/private-route'
import { Header, currentAccountState } from '@/presentation/components'
import { RecoilRoot } from 'recoil'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters'

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
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Header>
          <Switch>
            <Route path="/login" exact component={makeLogin} />
            <PrivateRoute path="/" exact component={makeDragons} />
            <PrivateRoute path="/update/:id" exact component={updateDragon} />
            <PrivateRoute path="/details/:id" exact component={detailsPage} />
            <PrivateRoute path="/new" exact component={addDragon} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Header>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
