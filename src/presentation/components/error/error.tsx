import { NoContentError, UnexpectedError } from '@/domain/errors'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './error-styles.scss'

type Props = {
  error: Error
  reload?: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  let action

  const switchUnexpectedError = (): JSX.Element => {
    switch (true) {
      case !!reload:
        return (
        <button data-testid="reload" onClick={reload}>
          Tentar novamente
        </button>
        )
      default:
        return <Link to="/">
        <span>Voltar para a página inicial</span>
      </Link>
    }
  }

  switch (true) {
    case error instanceof UnexpectedError:
      action = switchUnexpectedError()
      break
    case error instanceof NoContentError:
      action = (
        <Link to="/new">
          <span data-testid="create-dragon-error">Crie um Dragão</span>
        </Link>
      )
      break
  }

  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error.message}</span>
     {action}
    </div>
  )
}

export default Error
