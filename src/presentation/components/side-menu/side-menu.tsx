import { useTruncate } from '@/presentation/hooks'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentAccountState, sidebarState } from '..'
import Styles from './side-menu-styles.scss'

type Props = {
  leave: () => void
}

const SideBar: React.FC<Props> = ({ leave }) => {
  const [state, setState] = useRecoilState(sidebarState)
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const close = (): void => setState((old) => ({ ...old, open: !state.open }))

  return (
    <nav data-status={state.open ? 'open' : 'closed'}>
      <div className={Styles.greeting}>
        Olá, {useTruncate(getCurrentAccount(), 20)}
      </div>
      <Link onClick={close} to="/">
        Dragões
      </Link>
      <Link onClick={close} to="/new">
        Criar Dragão
      </Link>
      <span
        onClick={() => { leave(); close() }}>
        Sair
      </span>
    </nav>
  )
}

export default SideBar
