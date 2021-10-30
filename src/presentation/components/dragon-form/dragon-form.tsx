import React, { Context, useContext } from 'react'
import Styles from './dragon-form-styles.scss'
import { Input, TextArea, FormStatus } from '@/presentation/components'

type Props = {
  handle: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  context: Context<any>
  title: string
}

const Form: React.FC<Props> = ({ handle, context, title }) => {
  const { state, errorState } = useContext(context)
  const formState = state[0]
  const errorFormState = errorState[0]
  return (
    <form data-testid="form" className={Styles.form} onSubmit={handle}>
      <h2>{title} Dragão</h2>
      <Input
        inputProps={{
          type: 'text',
          name: 'name',
          placeholder: 'Nome do dragão',
          value: formState.name
        }}
        context={context}
      />
      <TextArea
        inputProps={{
          name: 'type',
          placeholder: 'Tipo do dragão',
          value: formState.type
        }}
        context={context}
      />
      <button
        disabled={
          !!errorFormState.main ||
          !!errorFormState.name ||
          !!errorFormState.type
        }
        data-testid="submit-button"
        type="submit"
      >
        {title}
      </button>
      <FormStatus context={context} />
    </form>
  )
}

export default Form
