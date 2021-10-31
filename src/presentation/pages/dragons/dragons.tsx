import React, { useEffect, useState } from 'react'
import Styles from './dragons-styles.scss'
import { GetDragons, ExcludeDragon } from '@/domain/usecases/'
import { DragonList } from './components'
import DragonsContext, {
  StateTypes
} from '@/presentation/contexts/dragon-context'
import { Error } from '@/presentation/components'

type Props = {
  getDragons: GetDragons
  excludeDragon: ExcludeDragon
}

const Dragons: React.FC<Props> = ({ getDragons, excludeDragon }) => {
  const [skipCount, setSkipCount] = useState(true)
  const [state, setState] = useState<StateTypes>({
    dragons: [],
    isLoading: false,
    error: null,
    reload: false,
    id: null
  })

  const reload = (): void => setState((prevState) => ({
    ...prevState,
    dragons: [],
    error: null,
    reload: !state.reload,
    id: null
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
          error: error
        }))
      })
  }, [state.reload])

  useEffect(() => {
    if (skipCount) setSkipCount(false)
    if (!skipCount && state.id) {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      excludeDragon.delete(state.id)
        .then(() => {
          reload()
        })
        .catch((error) => {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            error: error
          }))
        })
    }
  }, [state.id])

  return (
    <DragonsContext.Provider value={{ state, setState }}>
      <div className={Styles.dragonListWrapper}>
        <div className={Styles.contentWrapper}>
          <h2>Dragões</h2>
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
