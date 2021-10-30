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

  const logoutHandler = async (): Promise<void> => {
    await deleteAccessToken.delete()
    setState((prevState) => ({
      ...prevState,
      isAuth: false,
      user: null
    }))
  }

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
      <SideMenu leave={logoutHandler}/>
      <header className={Styles.headerWrapper}>
        <div className={Styles.headerContent}>
          <Logo />
          {state.user && (
            <>
              <Link className={Styles.link} to="/new">Criar Dragão</Link>
              <div className={Styles.greeting}>
                <span>Olá, {state.user}</span>
                <span onClick={logoutHandler}>
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
