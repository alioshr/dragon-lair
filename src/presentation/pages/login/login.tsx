import React, { useContext, useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { FormStatus, Input } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import LoginContext, {
  StateTypes,
  ErrorStateTypes
} from '@/presentation/contexts/login-context'
import { SaveAccessToken } from '@/domain/usecases'
import { Redirect, useHistory } from 'react-router-dom'
import authContext from '@/presentation/contexts/auth-context'

type Props = {
  validator: Validator
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validator, saveAccessToken }) => {
  const context = useContext(authContext)
  const history = useHistory()
  const [state, setState] = useState<StateTypes>({
    name: '',
    password: ''
  })

  const [errorState, setErrorState] = useState<ErrorStateTypes>({
    name: '',
    password: '',
    main: ''
  })

  useEffect(() => {
    const nameError = validator.validate('name', state)
    const passwordError = validator.validate('password', state)

    setErrorState((prevState) => ({
      ...prevState,
      name: nameError,
      password: passwordError
    }))
  }, [state.password, state.name])

  const loginHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      await saveAccessToken.save(state.name)
      context.setState((old) => ({ ...old, isAuth: true, user: state.name }))
      history.replace('/')
    } catch (error) {
      setErrorState((prevState) => ({
        ...prevState,
        main: (error as Error).message
      }))
    }
  }

  return (
    <LoginContext.Provider
      value={{
        state: [state, setState],
        errorState: [errorState, setErrorState]
      }}
    >
      {context.state.isAuth && <Redirect to="/" />}
      <div className={Styles.wrapper}>
        <form
          data-testid="login-form"
          className={Styles.form}
          onSubmit={loginHandler}
        >
          <h2>Bem vindo(a)</h2>
          <Input
            inputProps={{
              type: 'text',
              name: 'name',
              placeholder: 'Nome de usuário'
            }}
            context={LoginContext}
          />
          <Input
            inputProps={{
              type: 'password',
              name: 'password',
              placeholder: 'Senha'
            }}
            context={LoginContext}
          />
          <button
            disabled={!!errorState.name || !!errorState.password}
            data-testid="submit-button"
            type="submit"
          >
            Entrar
          </button>
          <FormStatus context={LoginContext} />
        </form>
      </div>
    </LoginContext.Provider>
  )
}

export default Login
