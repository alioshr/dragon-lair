import React, { useEffect } from 'react'
import Styles from './add-dragon-styles.scss'
import { DragonFormSkeleton } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import { AddDragon } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'
import {
  Input,
  TextArea,
  SubmitButton,
  FormStatus,
  addDragonState
} from './components'
import { useRecoilState } from 'recoil'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  validator: Validator
  createDragon: AddDragon
}

const AddDragonPage: React.FC<Props> = ({ validator, createDragon }) => {
  const history = useHistory()
  const [state, setState] = useRecoilState(addDragonState)
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, mainError: error.message, isLoading: false }))
  })

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('type'), [state.type])

  const validate = (field: string): void => {
    const { name, type } = state
    const formData = { name, type }
    setState((old) => ({
      ...old,
      [`${field}Error`]: validator.validate(field, formData)
    }))
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.typeError
    }))
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (state.isLoading || state.isFormInvalid) {
      return
    }
    setState((old) => ({ ...old, isLoading: true }))
    try {
      await createDragon.add({ name: state.name, type: state.type })
      history.replace('/')
    } catch (error) {
      handleError(error as Error)
    }
  }

  return (
    <div className={Styles.wrapper} data-testid="wrapper">
      {state.isLoading && !state.name
        ? (
        <DragonFormSkeleton />
          )
        : (
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Criar Dragão</h2>
          <Input type="text" name="name" placeholder="Nome do dragão" />
          <TextArea name="type" placeholder="Tipo do dragão" />
          <SubmitButton text="Criar" />
          <FormStatus />
        </form>
          )}
    </div>
  )
}

export default AddDragonPage
