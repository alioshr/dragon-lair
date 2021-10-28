import React, { useEffect, useState } from 'react'
import Styles from './dragons-styles.scss'
import { GetDragons } from '@/domain/usecases/get-dragons'
import { DragonList } from './components'
import DragonsContext, {
  StateTypes
} from '@/presentation/contexts/dragon-context'
import { Error } from '@/presentation/components'

type Props = {
  getDragons: GetDragons
}

const Dragons: React.FC<Props> = ({ getDragons }) => {
  const [state, setState] = useState<StateTypes>({
    dragons: [],
    isLoading: false,
    error: null,
    reload: false
  })

  const reload = (): void => setState((prevState) => ({
    ...prevState,
    dragons: [],
    error: '',
    reload: !state.reload
  }))

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
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error.message
        }))
      })
  }, [state.reload])

  return (
    <DragonsContext.Provider value={{ state, setState }}>
      <div className={Styles.dragonListWrapper}>
        <div className={Styles.contentWrapper}>
          <h2>Dragons</h2>
          {state.error
            ? (
            <Error error={state.error} reload={reload} />
              )
            : (
            <DragonList />
              )}
        </div>
      </div>
    </DragonsContext.Provider>
  )
}

export default Dragons
