import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Input } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import FormContext, {
  StateTypes,
  ErrorStateTypes
} from '@/presentation/contexts/form-context'

type Props = {
  validator: Validator
}

const Login: React.FC<Props> = ({ validator }) => {
  const [state, setState] = useState<StateTypes>({
    name: '',
    password: ''
  })

  const [errorState, setErrorState] = useState<ErrorStateTypes>({
    name: '',
    password: ''
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

  return (
    <FormContext.Provider
      value={{
        formState: [state, setState],
        errorState: [errorState, setErrorState]
      }}
    >
      <div className={Styles.wrapper}>
        <form data-testid="login-form" className={Styles.form}>
          <h2>Bem vindo(a)</h2>
          <Input type="text" name="name" placeholder="Nome de usuário" />
          <Input type="password" name="password" placeholder="Senha" />
          <button
            disabled={!!errorState.name || !!errorState.password}
            data-testid="submit-button"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </FormContext.Provider>
  )
}

export default Login
