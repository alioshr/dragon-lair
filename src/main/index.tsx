import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router/router'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeDragons } from './factories/pages/dragons/dragons-factory'
import { makeUpdateDragon } from './factories/pages/update-dragon/update-dragon-factory'
import { makeDetailsPage } from './factories/pages/details/details-page-factory'

ReactDOM.render(
  <Router
  makeLogin={makeLogin}
  makeDragons={makeDragons}
  updateDragon={makeUpdateDragon}
  detailsPage={makeDetailsPage}
  />,
  document.getElementById('main')
)
