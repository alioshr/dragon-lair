import { Input, FormStatus, TextArea } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import Styles from './update-dragon-styles.scss'
import UpdateDragonContext, {
  ErrorStateTypes,
  StateTypes
} from '@/presentation/contexts/update-dragon-context'
import { GetDragon } from '@/domain/usecases'
import { useParams } from 'react-router-dom'

type Props = {
  getDragon: GetDragon
}

const UpdateDragon: React.FC<Props> = ({ getDragon }) => {
  const { id } = useParams<{id: string}>()

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
    getDragon.get(id).then().catch(err => console.log(err))
  }, [])

  return (
    <UpdateDragonContext.Provider
      value={{
        state: [state, setState],
        errorState: [errorState, setErrorState]
      }}
    >
      <div className={Styles.wrapper}>
        <form data-testid="login-form" className={Styles.form}>
          <h2>Atualizar Dragão (NOME)</h2>
          <Input
            inputProps={{
              type: 'text',
              name: 'name',
              placeholder: 'Nome do dragão'
            }}
            context={UpdateDragonContext}
          />
          <TextArea
          inputProps={{
            name: 'type',
            placeholder: 'Tipo do dragão'
          }}
          context={UpdateDragonContext}
          />
          <button data-testid="submit-button" type="submit">
            Atualizar
          </button>
          <FormStatus context={UpdateDragonContext}/>
        </form>
      </div>
    </UpdateDragonContext.Provider>
  )
}

export default UpdateDragon
