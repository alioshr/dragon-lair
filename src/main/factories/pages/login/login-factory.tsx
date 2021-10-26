import React from 'react'
import Login from '../../../../presentation/pages/login/login'
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory'
import { makeLoginValidations } from './login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    validator={makeLoginValidations()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
)
