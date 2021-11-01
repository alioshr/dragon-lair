import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { makeLoginValidations } from './login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    validator={makeLoginValidations()}
  />
)
