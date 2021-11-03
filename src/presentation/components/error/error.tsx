import { NoContentError } from '@/domain/errors'
import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './error-styles.scss'

type Props = {
  error: Error
  reload?: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  let action

  const checkReload = (): JSX.Element => {
    switch (true) {
      case !!reload:
        return (
          <button data-testid="reload" onClick={reload}>
            Tentar novamente
          </button>
        )
      default:
        return (
          <Link to="/">
            <span>Voltar para a página inicial</span>
          </Link>
        )
    }
  }

  switch (true) {
    case error instanceof NoContentError:
      action = (
        <Link to="/new">
          <span data-testid="create-dragon-error">Crie um Dragão</span>
        </Link>
      )
      break
    default:
      action = checkReload()
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
