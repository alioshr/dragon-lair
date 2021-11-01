import React, { useEffect } from 'react'
import Styles from './login-styles.scss'
import { currentAccountState } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import { Redirect, useHistory } from 'react-router-dom'
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { loginState, Input, SubmitButton, FormStatus } from './components'

type Props = {
  validator: Validator
}

const Login: React.FC<Props> = ({ validator }) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount, getCurrentAccount } = useRecoilValue(currentAccountState)
  const history = useHistory()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { name, password } = state
    const formData = { name, password }
    setState(old => ({ ...old, [`${field}Error`]: validator.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.passwordError }))
  }

  const loginHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      await setCurrentAccount(state.name)
      history.replace('/')
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        main: (error as Error).message
      }))
    }
  }

  return (
  <>
      {getCurrentAccount() && <Redirect to="/" />}
      <div className={Styles.wrapper}>
        <form
          data-testid="login-form"
          className={Styles.form}
          onSubmit={loginHandler}
        >
          <h2>Bem vindo(a)</h2>
          <Input
          type='text'
          name='name'
          placeholder='Nome de usuário'
          />
          <Input
          type='password'
          name='password'
          placeholder='Senha'
          />
          <SubmitButton text="Entrar" />
          <FormStatus />
        </form>
      </div>
      </>
  )
}

export default Login
