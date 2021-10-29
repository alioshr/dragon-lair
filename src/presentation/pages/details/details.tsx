import React, { useEffect, useState } from 'react'
import Styles from './details-styles.scss'
import { GetDragon } from '@/domain/usecases'
import { useParams } from 'react-router-dom'
import Skeleton from './components/skeleton/skeleton'

type Props = {
  getDragon: GetDragon
}

const DetailsDragonPage: React.FC<Props> = ({ getDragon }) => {
  const { id } = useParams<{ id: string }>()

  const [state, setState] = useState({
    name: '',
    type: '',
    createdAt: null as any,
    isLoading: false
  })

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    getDragon
      .get(id)
      .then((dragon) => {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          name: dragon.name,
          type: dragon.type,
          createdAt: dragon.createdAt
        }))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={Styles.wrapper} data-testid="wrapper">
        <div className={Styles.content}>
        {state.isLoading
          ? <Skeleton />
          : <>
          <h2>Detalhes do dragão</h2>
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
          </> }
        </div>
          )
    </div>
  )
}

export default DetailsDragonPage
