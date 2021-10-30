import authContext from '@/presentation/contexts/auth-context'
import Styles from './burguer-styles.scss'
import React, { useContext } from 'react'

const Burger: React.FC = () => {
  const { state, setState } = useContext(authContext)
  return (
    <button className={Styles.burguer} data-status={state.open ? 'open' : 'closed'} onClick={() => setState((prevState) => ({ ...prevState, open: !state.open }))}>
      <div />
      <div />
      <div />
    </button>
  )
}

export default Burger
