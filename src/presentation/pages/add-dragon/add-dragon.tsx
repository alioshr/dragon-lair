import React, { useEffect, useState } from 'react'
import DragonFormContext, { StateTypes, ErrorStateTypes } from '@/presentation/contexts/dragon-form-context'
import Styles from './add-dragon-styles.scss'
import { DragonFormSkeleton, DragonForm } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import { AddDragon } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

type Props = {
  validator: Validator
  createDragon: AddDragon
}

const AddDragonPage: React.FC<Props> = ({ validator, createDragon }) => {
  const history = useHistory()
  const [state, setState] = useState<StateTypes>({
    name: '',
    type: '',
    isLoading: false
  })

  const [errorState, setErrorState] = useState<ErrorStateTypes>({
    name: '',
    type: '',
    main: ''
  })

  useEffect(() => {
    const formState = {
      name: state.name,
      type: state.type
    }
    const nameError = validator.validate('name', formState)
    const typeError = validator.validate('type', formState)
    console.log(nameError, typeError)
    setErrorState((prevState) => ({
      ...prevState,
      name: nameError,
      type: typeError
    }))
  }, [state.name, state.type])

  const handleSubmit = async (): Promise<void> => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true
    }))
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (errorState.main || errorState.name || errorState.type) {
      return
    }
    try {
      await createDragon.add({ name: state.name, type: state.type })
      history.replace('/')
    } catch (error) {
      setErrorState((prevState) => ({
        ...prevState,
        main: (error as Error).message
      }))
      setState((prevState) => ({
        ...prevState,
        isLoading: false
      }))
    }
  }

  return (
    <DragonFormContext.Provider
      value={{
        state: [state, setState],
        errorState: [errorState, setErrorState]
      }}
    >
      <div className={Styles.wrapper} data-testid="wrapper">
        {state.isLoading && !state.name
          ? (
          <DragonFormSkeleton />
            )
          : (
          <DragonForm
            title="Criar"
            context={DragonFormContext}
            handle={handleSubmit}
          />
            )}
      </div>
    </DragonFormContext.Provider>
  )
}

export default AddDragonPage
