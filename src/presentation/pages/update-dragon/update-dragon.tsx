import React, { useEffect, useState } from 'react'
import Styles from './update-dragon-styles.scss'
import UpdateDragonContext, {
  ErrorStateTypes,
  StateTypes
} from '@/presentation/contexts/update-dragon-context'
import { GetDragon } from '@/domain/usecases'
import { useHistory, useParams } from 'react-router-dom'
import Skeleton from './components/skeleton/skeleton'
import { Validator } from '@/presentation/protocols'
import { UpdateDragon } from '@/domain/usecases/update-dragon'
import Form from './components/form/form'

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
  const [skipCount, setSkipCount] = useState(true)

  const [defaultData, setDefault] = useState({
    type: '',
    name: ''
  })

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
    if (skipCount) setSkipCount(false)
    if (!skipCount) {
      const nameState = {
        name: state.name,
        defaultName: defaultData.name
      }
      const typeState = {
        type: state.type,
        defaultType: defaultData.type
      }
      const nameError = validator.validate('name', nameState)
      const typeError = validator.validate('type', typeState)
      const invalidForm = nameError && typeError
      setErrorState((prevState) => ({
        ...prevState,
        name: invalidForm && nameError,
        type: invalidForm && typeError
      }))
    }
  }, [state.name, state.type])

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
      .catch((err) => console.log(err))
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }))
      await updateDragon.update({
        id,
        body: {
          type: state.type,
          name: state.name
        }
      })
      history.replace('/')
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        main: (error as Error).message
      }))
    }
  }

  return (
    <UpdateDragonContext.Provider
      value={{
        state: [state, setState],
        errorState: [errorState, setErrorState]
      }}
    >
      <div className={Styles.wrapper} data-testid="wrapper">
      {state.isLoading && !state.name ? <Skeleton /> : <Form handle={handleSubmit} />}
      </div>
    </UpdateDragonContext.Provider>
  )
}

export default UpdateDragonPage
