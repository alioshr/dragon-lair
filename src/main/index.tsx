import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/router/router'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeDragons } from './factories/pages/dragons/dragons-factory'
import { makeUpdateDragon } from './factories/pages/update-dragon/update-dragon-factory'
import { makeDetailsPage } from './factories/pages/details/details-page-factory'
import { makeAddDragon } from './factories/pages/add-dragon/add-dragon-factory'

ReactDOM.render(
  <Router
  makeLogin={makeLogin}
  makeDragons={makeDragons}
  updateDragon={makeUpdateDragon}
  detailsPage={makeDetailsPage}
  addDragon={makeAddDragon}
  />,
  document.getElementById('main')
)
