import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import { Header } from '../components'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }) => {
  return (
    <Header>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
        </Switch>
      </BrowserRouter>
    </Header>
  )
}

export default Router
