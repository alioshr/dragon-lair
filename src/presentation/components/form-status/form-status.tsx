import React from 'react'
import { Spinner } from '..'
import Styles from './form-status-styles.scss'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }) => {
  const { isLoading, mainError } = state

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
