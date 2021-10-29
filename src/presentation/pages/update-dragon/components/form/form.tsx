import React, { useContext } from 'react'
import Styles from './form-styles.scss'
import UpdateDragonContext from '@/presentation/contexts/update-dragon-context'
import { Input, TextArea, FormStatus } from '@/presentation/components'

type Props = {
  handle: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

const Form: React.FC<Props> = ({ handle }) => {
  const { state, errorState } = useContext(UpdateDragonContext)
  const formState = state[0]
  const errorFormState = errorState[0]
  return (
    <form
    data-testid="form"
    className={Styles.form}
    onSubmit={handle}
    >
      <h2>Atualizar Dragão</h2>
      <Input
        inputProps={{
          type: 'text',
          name: 'name',
          placeholder: 'Nome do dragão',
          value: formState.name
        }}
        context={UpdateDragonContext}
      />
      <TextArea
        inputProps={{
          name: 'type',
          placeholder: 'Tipo do dragão',
          value: formState.type
        }}
        context={UpdateDragonContext}
      />
      <button disabled={!!errorFormState.main || !!errorFormState.name || !!errorFormState.type} data-testid="submit-button" type="submit">
        Atualizar
      </button>
      <FormStatus context={UpdateDragonContext} />
    </form>
  )
}

export default Form
