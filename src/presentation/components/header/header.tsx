import { currentAccountState, Logo, SideMenu } from '@/presentation/components'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Styles from './header-styles.scss'
import Burger from '@/presentation/components/burguer/burguer'
import { useLogout } from '@/presentation/hooks/use-logout'
import { useRecoilValue } from 'recoil'

type Props = {
  children: JSX.Element
}

const Header: React.FC<Props> = ({
  children
}) => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  return (
    <>
      {getCurrentAccount() && <Burger />}
      <SideMenu leave={logout}/>
      <header className={Styles.headerWrapper}>
        <div data-status={!getCurrentAccount() && 'notAuth'} className={Styles.headerContent}>
          <Logo />
          {getCurrentAccount() && (
            <>
              <Link className={Styles.link} to="/new">Criar Dragão</Link>
              <div className={Styles.greeting}>
                <span>Olá, {getCurrentAccount()}</span>
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
