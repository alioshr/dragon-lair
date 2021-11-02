import React from 'react'
import { Spinner } from '..'
import Styles from './form-status-styles.scss'

type Props = {
  isLoading: boolean
  mainError: string
}

const FormStatus: React.FC<Props> = ({ isLoading, mainError }) => {
  return (
    <div data-testid="status-wrapper" className={Styles.errorWrapper}>
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
      {isLoading && (
        <Spinner data-testid="status-spinner" className="spinner" />
      )}
    </div>
  )
}

export default FormStatus
