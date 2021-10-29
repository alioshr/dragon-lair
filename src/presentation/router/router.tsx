import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import { Header } from '../components'

type Props = {
  makeLogin: React.FC
  makeDragons: React.FC
  updateDragon: React.FC
  detailsPage: React.FC
}

const Router: React.FC<Props> = ({
  makeLogin,
  makeDragons,
  updateDragon,
  detailsPage
}) => {
  return (
    <BrowserRouter>
      <Header>
        <Switch>
          <Route path="/" exact component={makeDragons} />
          <Route path="/login" exact component={makeLogin} />
          <Route path="/update/:id" exact component={updateDragon} />
          <Route path="/details/:id" exact component={detailsPage} />
        </Switch>
      </Header>
    </BrowserRouter>
  )
}

export default Router
