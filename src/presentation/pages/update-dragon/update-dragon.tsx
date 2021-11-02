import React, { useEffect, useState } from 'react'
import Styles from './update-dragon-styles.scss'
import { GetDragon } from '@/domain/usecases'
import { useHistory, useParams } from 'react-router-dom'
import { DragonFormSkeleton } from '@/presentation/components'
import { Validator } from '@/presentation/protocols'
import { UpdateDragon } from '@/domain/usecases/update-dragon'
import { Input, TextArea, SubmitButton, FormStatus, updateDragonState, Error } from './components/'
import { useErrorHandler } from '@/presentation/hooks'
import { useRecoilState, useResetRecoilState } from 'recoil'

type Props = {
  getDragon: GetDragon
  validator: Validator
  updateDragon: UpdateDragon
}

const UpdateDragonPage: React.FC<Props> = ({
  getDragon,
  validator,
  updateDragon
}) => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const resetState = useResetRecoilState(updateDragonState)
  const [defaultData, setDefault] = useState({ type: '', name: '' })
  const [state, setState] = useRecoilState(updateDragonState)
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, mainError: error, isLoading: false }))
  })

  useEffect(() => resetState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('type'), [state.type])

  const validate = (field: string): void => {
    const fieldData = field as 'name' | 'type'
    const formData = {
      [field]: state[fieldData],
      [`${fieldData}Default`]: defaultData[fieldData]
    }
    setState((old) => ({
      ...old,
      [`${field}Error`]: validator.validate(field, formData)
    }))
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.nameError && !!old.typeError
    }))
  }

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    getDragon
      .get(id)
      .then((dragon) => {
        setDefault((prevState) => ({
          ...prevState,
          name: dragon.name,
          type: dragon.type
        }))
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          name: dragon.name,
          type: dragon.type
        }))
      })
      .catch(handleError)
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (state.isLoading || state.isFormInvalid) {
      return
    }

    try {
      const { type, name } = state
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }))
      await updateDragon.update({ id, body: { type, name } })
      history.replace('/')
    } catch (error) {
      handleError(error as Error)
    }
  }

  return (
    <div className={Styles.wrapper} data-testid="wrapper">
      <div className={Styles.content}>
      {state.mainError && !state.name && <Error />}
      {state.isLoading && !state.name && <DragonFormSkeleton />}
      {state.name &&
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Atualizar Dragão</h2>
          <Input value={state.name} type="text" name="name" placeholder="Nome do dragão" />
          <TextArea value={state.type} name="type" placeholder="Tipo do dragão" />
          <SubmitButton text="Atualizar" />
          <FormStatus />
        </form>
          }
      </div>
    </div>
  )
}

export default UpdateDragonPage
