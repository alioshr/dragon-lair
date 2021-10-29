import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import { Header } from '../components'
import { UpdateDragon } from '../pages'

type Props = {
  makeLogin: React.FC
  makeDragons: React.FC
}

const Router: React.FC<Props> = ({ makeLogin, makeDragons }) => {
  return (
    <Header>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={makeDragons} />
          <Route path="/login" exact component={makeLogin} />
          <Route path="/update/:id" exact component={UpdateDragon} />
        </Switch>
      </BrowserRouter>
    </Header>
  )
}

export default Router
