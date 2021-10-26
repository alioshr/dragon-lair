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
      <h2>DRAGON LAIR</h2>
        <div className={Styles.logoutWrapper}>
          <span>Aliosh</span>
          <a href="#">Leave</a>
        </div>
      </div>
    </header>
    <div className={Styles.mainContent}>{children}</div>
  </React.Fragment>
)

export default memo(Header)
