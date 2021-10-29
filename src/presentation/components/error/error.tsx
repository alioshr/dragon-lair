import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './error-styles.scss'

type Props = {
  error: string
  reload?: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      {reload
        ? <button data-testid="reload" onClick={reload}>Tentar novamente</button>
        : <Link to="/"><span>Voltar para a página inicial</span></Link>
      }
    </div>
  )
}

export default Error
