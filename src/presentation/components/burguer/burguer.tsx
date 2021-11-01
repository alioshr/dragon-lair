import Styles from './burguer-styles.scss'
import React from 'react'
import { sidebarState } from '..'
import { useRecoilState } from 'recoil'

const Burger: React.FC = () => {
  const [state, setState] = useRecoilState(sidebarState)
  return (
    <button
      className={Styles.burguer}
      data-status={state.open ? 'open' : 'closed'}
      onClick={() =>
        setState((prevState) => ({ ...prevState, open: !state.open }))
      }
    >
      <div />
      <div />
      <div />
    </button>
  )
}

export default Burger
