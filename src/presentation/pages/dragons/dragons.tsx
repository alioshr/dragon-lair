import React, { useEffect, useState } from 'react'
import Styles from './dragons-styles.scss'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { DragonList } from './components'
import DragonsContext, {
  StateTypes
} from '@/presentation/contexts/dragon-context'

type Props = {
  getDragons: GetDragons
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
    <DragonsContext.Provider
    value={{ state, setState }}>
    <div className={Styles.dragonListWrapper}>
      <div className={Styles.contentWrapper}>
        <h2>Dragons</h2>
        <DragonList />
      </div>
    </div>
    </DragonsContext.Provider>
  )
}

export default Dragons
