import React, { useEffect, useState } from 'react'
import DragonFormContext, { StateTypes, ErrorStateTypes } from '@/presentation/contexts/dragon-form-context'
import Styles from './add-dragon-styles.scss'
import { DragonFormSkeleton, DragonForm } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'

type Props = {
  validator: Validator
}

const AddDragon: React.FC<Props> = ({ validator }) => {
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

  const handleSubmit = async (): Promise<void> => await Promise.resolve(console.log())

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

export default AddDragon
