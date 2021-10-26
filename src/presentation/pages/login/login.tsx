import { Input } from '@/presentation/components'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return <div className={Styles.wrapper}>
        <form
          data-testid="login-form"
          className={Styles.form}
        >
          <h2>Bem vindo(a)</h2>
          <Input type="text" name="user" placeholder="Nome de usuário" />
          <Input type="password" name="password" placeholder="Senha" />
          <button
            disabled
            data-testid="submit-button"
            type="submit"
          >
            Login
          </button>
        </form>
  </div>
}

export default Login
