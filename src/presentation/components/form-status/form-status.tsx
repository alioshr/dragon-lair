import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import FormContext, {
  FormStateTypes
} from '@/presentation/contexts/form-context'

const FormStatus: React.FC = () => {
  const { errorState } = useContext<FormStateTypes>(FormContext)

  return (
    <div data-testid="status-wrapper" className={Styles.errorWrapper}>
      {errorState[0].main && <span data-testid="main-error" className={Styles.error}>{errorState[0].main}</span>}
    </div>
  )
}

export default FormStatus
