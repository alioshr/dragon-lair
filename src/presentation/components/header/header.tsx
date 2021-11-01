import { currentAccountState, Logo, headerState, SideMenu } from '@/presentation/components'
import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from './header-styles.scss'
import Burger from '@/presentation/components/burguer/burguer'
import { useLogout } from '@/presentation/hooks'
import { useRecoilState, useRecoilValue } from 'recoil'

type Props = {
  children: JSX.Element
}

const Header: React.FC<Props> = ({
  children
}) => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(headerState)

  useEffect(() => {
    setState((old) => ({ ...old, user: getCurrentAccount() }))
  }, [])

  return (
    <>
      {state.user && <Burger />}
      <SideMenu leave={logout}/>
      <header className={Styles.headerWrapper}>
        <div data-status={!state.user && 'notAuth'} className={Styles.headerContent}>
          <Logo />
          {state.user && (
            <>
              <Link className={Styles.link} to="/new">Criar Dragão</Link>
              <div className={Styles.greeting}>
                <span>Olá, {state.user}</span>
                <span onClick={logout}>
                  Sair
                </span>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </>
  )
}

export default memo(Header)
