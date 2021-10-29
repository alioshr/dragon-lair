import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Styles from './dragon-styles.scss'
import { Dragon } from '@/domain/models'
import { useTruncate } from '@/presentation/hooks'
import DragonContext, { DragonStateTypes } from '@/presentation/contexts/dragon-context'

type Props = {
  dragon: Dragon
  exclude: (id: string) => any
}

const DragonCard: React.FC<Props> = ({ dragon, exclude }) => {
  const { state } = useContext<DragonStateTypes>(DragonContext)

  return (
    <li>
      <div className={Styles.dragonContent}>
        <div className={Styles.actions}>
          <FontAwesomeIcon title="Editar Dragão" icon={faEdit} size="2x" />
          { state.isLoading
            ? <FontAwesomeIcon
            data-testid={`spinner-${dragon.id}`}
            icon={faSpinner}
            className="spinner"
            spin
            size="2x" />
            : <FontAwesomeIcon
            className="exclude"
            onClick={() => exclude(dragon.id)}
            data-testid={`exclude-${dragon.id}`}
            title="Excluir Dragão"
            icon={faTrash}
            size="2x"
          /> }
        </div>
        <time>
          <span className={Styles.day}>
            {new Date(dragon.createdAt).getDate()}
          </span>
          <span className={Styles.month}>
            {new Date(dragon.createdAt).getMonth() + 1}
          </span>
          <span className={Styles.year}>
            {new Date(dragon.createdAt).getFullYear()}
          </span>
        </time>
        <div className={Styles.infoWrapper}>
          <div className={Styles.infoCard}>
            <h2>Nome</h2>
            <p>{useTruncate(dragon.name, 80)}</p>
          </div>
        </div>
      </div>
      <footer>Detalhes</footer>
    </li>
  )
}

export default DragonCard
