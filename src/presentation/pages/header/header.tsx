import { DeleteAccessToken, GetAccessToken } from '@/domain/usecases'
import { Logo, SideMenu } from '@/presentation/components'
import React, { memo, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Styles from './header-styles.scss'
import AuthContext, { StateTypes } from '@/presentation/contexts/auth-context'
import Burger from '@/presentation/components/burguer/burguer'

type Props = {
  children: JSX.Element
  deleteAccessToken: DeleteAccessToken
  getAccessToken: GetAccessToken
}

const Header: React.FC<Props> = ({
  children,
  deleteAccessToken,
  getAccessToken
}) => {
  const [state, setState] = useState<StateTypes>({
    isAuth: false,
    user: null,
    open: false
  })
  const history = useHistory()

  useEffect(() => {
    if (!state.isAuth) {
      deleteAccessToken.delete().then(() => {
        setState((prevState) => ({
          ...prevState,
          isAuth: false,
          user: null
        }))
      }).catch(err => err)
    }
  }, [state.isAuth])

  useEffect(() => {
    try {
      const user = getAccessToken.get()
      setState((prevState) => ({
        ...prevState,
        isAuth: true,
        user
      }))
    } catch (err) {
      history.replace('/login')
      setState((prevState) => ({
        ...prevState,
        isAuth: false,
        user: null
      }))
    }
  }, [state.user])

  return (
    <AuthContext.Provider value={{ state, setState }}>
      <Burger />
      <SideMenu />
      <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          {state.user && (
            <>
              <Link className={Styles.link} to="/new">Criar Dragão</Link>
              <div className={Styles.greeting}>
                <span>Olá, {state.user}</span>
                <span onClick={() => setState((old) => ({ ...old, isAuth: false }))}>
                  Sair
                </span>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </AuthContext.Provider>
  )
}

export default memo(Header)
