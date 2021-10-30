// Menu.js
import authContext from '@/presentation/contexts/auth-context'
import { useTruncate } from '@/presentation/hooks'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Styles from './side-menu-styles.scss'

const SideBar: React.FC = () => {
  const { state, setState } = useContext(authContext)
  const close = (): void => setState((old) => ({ ...old, open: !state.open }))

  return (
    <nav data-status={state.open ? 'open' : 'closed'}>
      <div className={Styles.greeting}>
        Olá, {useTruncate(state.user as string, 20)}
      </div>
      <Link onClick={close} to="/">
        Dragões
      </Link>
      <Link onClick={close} to="/new">
        Criar Dragão
      </Link>
      <span
        onClick={() =>
          setState((old) => ({
            ...old,
            open: !state.open,
            isAuth: false
          }))
        }
      >
        Sair
      </span>
    </nav>
  )
}

export default SideBar
