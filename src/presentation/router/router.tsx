import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import '@/presentation/styles/_global.scss'
import { Login } from '../pages'
import { Header } from '../components'

const Router: React.FC = () => {
  return (
    <Header>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    </Header>
  )
}

export default Router
