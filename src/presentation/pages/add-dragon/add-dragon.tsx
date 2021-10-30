import React, { useState } from 'react'
import DragonFormContext, { StateTypes, ErrorStateTypes } from '@/presentation/contexts/dragon-form-context'
import Styles from './add-dragon-styles.scss'
import { DragonFormSkeleton, DragonForm } from '@/presentation/components'

const AddDragon: React.FC = () => {
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
