import React, { memo } from 'react'
import { Logo } from '..'
import Styles from './header-styles.scss'

type Props = {
  children: JSX.Element
}

const Header: React.FC<Props> = ({ children }) => (
  <React.Fragment>
    <header className={Styles.headerWrapper}>
      <div className={Styles.headerContent}>
      <Logo />
        {/* <div className={Styles.logoutWrapper}>
          <span>Aliosh</span>
          <a href="#">Leave</a>
        </div> */}
      </div>
    </header>
    {children}
  </React.Fragment>
)

export default memo(Header)
