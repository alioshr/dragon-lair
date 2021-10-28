import React, { useEffect, useState } from 'react'
import Styles from './dragons-styles.scss'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { Dragon } from '@/domain/models'
import { DragonCard } from './components'

type Props = {
  getDragons: GetDragons
}

type StateTypes = {
  dragons: Dragon[]
  isLoading: boolean
  error: null | string
}

const Dragons: React.FC<Props> = ({ getDragons }) => {
  const [state, setState] = useState<StateTypes>({
    dragons: [],
    isLoading: false,
    error: null
  })

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    getDragons
      .get()
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          dragons: response,
          isLoading: false
        }))
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className={Styles.dragonListWrapper}>
      <div className={Styles.contentWrapper}>
        <h2>Dragons</h2>
        <ul data-testid="dragons-list">
          {state.dragons.map((dragon, i) => (
            <DragonCard key={i} dragon={dragon} />
          ))}
          {state.isLoading && (
            <>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Dragons
