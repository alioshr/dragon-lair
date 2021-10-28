import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeDragons } from './factories/pages/dragons/dragons-factory'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeDragons={makeDragons}/>,
  document.getElementById('main')
)
