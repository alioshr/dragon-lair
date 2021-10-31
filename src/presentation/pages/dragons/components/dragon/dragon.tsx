import React, { useContext } from 'react'
import Styles from './dragon-styles.scss'
import { Dragon } from '@/domain/models'
import { useTruncate } from '@/presentation/hooks'
import DragonContext, {
  DragonStateTypes
} from '@/presentation/contexts/dragon-context'
import { Link } from 'react-router-dom'
import { EditIcon, Spinner, TrashIcon } from '@/presentation/components'

type Props = {
  dragon: Dragon
}

const DragonCard: React.FC<Props> = ({ dragon }) => {
  const { state, setState } = useContext<DragonStateTypes>(DragonContext)

  return (
    <li>
      <div className={Styles.dragonContent}>
        <div className={Styles.actions}>
          <Link to={`/update/${dragon.id}`}>
            <EditIcon title="Editar Dragão" />
          </Link>
          {state.isLoading && state.id === dragon.id
            ? (
            <Spinner data-testid={`spinner-${dragon.id}`} className="spinner" />
              )
            : (
            <TrashIcon
              className="exclude"
              onClick={() =>
                setState((prevState) => ({ ...prevState, id: dragon.id }))
              }
              data-testid={`exclude-${dragon.id}`}
              title="Excluir Dragão"
            />
              )}
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
      <Link to={`/details/${dragon.id}`}>
        <footer>Detalhes</footer>
      </Link>
    </li>
  )
}

export default DragonCard
