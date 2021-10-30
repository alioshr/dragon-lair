import React, { Context, useContext } from 'react'
import Styles from './dragon-form-styles.scss'
import { Input, TextArea, FormStatus } from '@/presentation/components'

type FormElementProps = {
  type?: string
  name: string
  placeholder: string
  value?: string
}

type Props = {
  handle: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  context: Context<any>
  title: 'Atualizar' | 'Criar'
}

const Form: React.FC<Props> = ({ handle, context, title }) => {
  const { state, errorState } = useContext(context)
  const formState = state[0]
  const errorFormState = errorState[0]

  const nameProps: FormElementProps = {
    type: 'text',
    name: 'name',
    placeholder: 'Nome do dragão'
  }
  const typeProps: FormElementProps = {
    name: 'type',
    placeholder: 'Tipo do dragão'
  }

  if (title === 'Atualizar') {
    nameProps.value = formState.name
    typeProps.value = formState.type
  }
  return (
    <form data-testid="form" className={Styles.form} onSubmit={handle}>
      <h2>{title} Dragão</h2>
      <Input
        inputProps={nameProps}
        context={context}
      />
      <TextArea
        inputProps={typeProps}
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
