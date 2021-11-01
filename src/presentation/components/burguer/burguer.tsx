import Styles from './burguer-styles.scss'
import React from 'react'
import { headerState } from '..'
import { useRecoilState } from 'recoil'

const Burger: React.FC = () => {
  const [state, setState] = useRecoilState(headerState)
  return (
    <button
      className={Styles.burguer}
      data-status={state.isSidebarOpen ? 'open' : 'closed'}
      onClick={() =>
        setState((prevState) => ({ ...prevState, isSidebarOpen: !state.isSidebarOpen }))
      }
    >
      <div />
      <div />
      <div />
    </button>
  )
}

export default Burger
