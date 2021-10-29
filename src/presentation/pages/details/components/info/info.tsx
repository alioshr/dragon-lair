import React from 'react'
import Skeleton from '../skeleton/skeleton'
import Styles from './info-styles.scss'

const Info: React.FC<any> = ({ state }) => {
  return state.isLoading
    ? <Skeleton />
    : <>
      <h2 data-testid="content">Detalhes do dragão</h2>
      <div className={Styles.info}>
        <h3>Nome:</h3>
        <span>{state.name}</span>
      </div>
      <div className={Styles.info}>
        <h3>Tipo:</h3>
        <span>{state.type}</span>
      </div>
      <div className={Styles.info}>
        <h3>Criado:</h3>
        <span>
          {new Date(state.createdAt).getDate()}/
          {new Date(state.createdAt).getMonth() + 1}/
          {new Date(state.createdAt).getFullYear()}
        </span>
      </div>
      </>
}

export default Info
