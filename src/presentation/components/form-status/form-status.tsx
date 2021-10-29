import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Context, useContext } from 'react'
import Styles from './form-status-styles.scss'

type Props = {
  context: Context<any>
}

const FormStatus: React.FC<Props> = ({ context }) => {
  const { errorState, state } = useContext<any>(context)

  return (
    <div data-testid="status-wrapper" className={Styles.errorWrapper}>
      {errorState[0].main && <span data-testid="main-error" className={Styles.error}>{errorState[0].main}</span>}
      {state[0].isLoading && <FontAwesomeIcon
            data-testid="status-spinner"
            icon={faSpinner}
            className="spinner"
            spin
            size="2x" />}
    </div>
  )
}

export default FormStatus
