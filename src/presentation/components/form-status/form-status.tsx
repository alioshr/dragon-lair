import React, { Context, useContext } from 'react'
import Styles from './form-status-styles.scss'

type Props = {
  context: Context<any>
}

const FormStatus: React.FC<Props> = ({ context }) => {
  const { errorState } = useContext<any>(context)

  return (
    <div data-testid="status-wrapper" className={Styles.errorWrapper}>
      {errorState[0].main && <span data-testid="main-error" className={Styles.error}>{errorState[0].main}</span>}
    </div>
  )
}

export default FormStatus
