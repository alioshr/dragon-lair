import React, { useEffect, useState } from 'react'
import Styles from './details-styles.scss'
import { GetDragon } from '@/domain/usecases'
import { useParams } from 'react-router-dom'
import { ErrorBase } from '@/presentation/components/'
import Info from './components/info/info'

type Props = {
  getDragon: GetDragon
}

const DetailsDragonPage: React.FC<Props> = ({ getDragon }) => {
  const { id } = useParams<{ id: string }>()

  const [state, setState] = useState({
    name: '',
    type: '',
    createdAt: null as any,
    isLoading: false,
    mainError: null
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
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          mainError: error
        }))
      })
  }, [])

  return (
    <div className={Styles.wrapper} data-testid="wrapper">
        <div data-testid="content-wrapper" className={Styles.content}>
        {state.mainError
          ? <ErrorBase error={state.mainError}/>
          : <Info state={state}/>
        }
        </div>
          )
    </div>
  )
}

export default DetailsDragonPage
