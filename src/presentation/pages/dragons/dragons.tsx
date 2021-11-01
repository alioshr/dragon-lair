import React, { useEffect } from 'react'
import Styles from './dragons-styles.scss'
import { GetDragons, ExcludeDragon } from '@/domain/usecases/'
import { DragonList } from './components'
import { ErrorBase } from '@/presentation/components'
import { dragonListState } from './components/atoms/atoms'
import { useErrorHandler } from '@/presentation/hooks'
import { useRecoilState, useResetRecoilState } from 'recoil'

type Props = {
  getDragons: GetDragons
  excludeDragon: ExcludeDragon
}

const Dragons: React.FC<Props> = ({ getDragons, excludeDragon }) => {
  const [state, setState] = useRecoilState(dragonListState)

  const resetDragonListState = useResetRecoilState(dragonListState)
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error, isLoading: false }))
  })

  const reload = (): void => setState((prevState) => ({
    ...prevState,
    dragons: [],
    error: null,
    reload: !state.reload,
    id: null
  }))

  useEffect(() => resetDragonListState(), [])
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
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    if (state.id) {
      setState((prevState) => ({ ...prevState, isLoading: true }))
      excludeDragon.delete(state.id)
        .then(reload)
        .catch(handleError)
    }
  }, [state.id])

  return (
      <div className={Styles.dragonListWrapper}>
        <div className={Styles.contentWrapper}>
          <h2>Dragões</h2>
          {state.error
            ? (
            <ErrorBase error={state.error} reload={reload} />
              )
            : (
            <DragonList />
              )}
        </div>
      </div>
  )
}

export default Dragons
