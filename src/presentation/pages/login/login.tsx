import React, { useEffect } from 'react'
import Styles from './login-styles.scss'
import { headerState } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import { Redirect } from 'react-router-dom'
import { useResetRecoilState, useRecoilState } from 'recoil'
import { loginState, Input, SubmitButton, FormStatus } from './components'
import { useLogin } from '@/presentation/hooks'

type Props = {
  validator: Validator
}

const Login: React.FC<Props> = ({ validator }) => {
  const [state, setState] = useRecoilState(loginState)
  const [userState] = useRecoilState(headerState)
  const resetLoginState = useResetRecoilState(loginState)
  const login = useLogin(state.name)

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
      login()
    } catch (error) {
      setState((old) => ({ ...old, main: (error as Error).message }))
    }
  }
  return (
  <>
      {userState.user && <Redirect to="/" />}
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
