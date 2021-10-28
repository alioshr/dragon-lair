import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import Styles from './dragon-styles.scss'
import { Dragon } from '@/domain/models'
import { useTruncate } from '@/presentation/hooks'

type Props = {
  dragon: Dragon
}

const DragonCard: React.FC<Props> = ({ dragon }) => {
  return (
    <li>
      <div className={Styles.dragonContent}>
        <div className={Styles.actions}>
          <FontAwesomeIcon title="Editar Dragão" icon={faEdit} size="2x" />
          <FontAwesomeIcon title="Excluir Dragão" icon={faTrash} size="2x" />
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
        <div className={Styles.dragonInfoWrapper}>
          <h2>Nome</h2>
          <p>{useTruncate(dragon.name, 20)}</p>
        </div>
        <div className={Styles.dragonInfoWrapper}>
          <h2>Tipo</h2>
          <p>{useTruncate(dragon.type, 20)}</p>
        </div>
      </div>
      <footer>Detalhes</footer>
    </li>
  )
}

export default DragonCard
