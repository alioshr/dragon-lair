import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import Styles from './dragon-styles.scss'

const Dragons: React.FC = () => {
  return (
    <div className={Styles.dragonListWrapper}>
      <div className={Styles.contentWrapper}>
        <h2>Dragons</h2>
        <ul>
          <li>
            <div className={Styles.dragonContent}>
              <div className={Styles.actions}>
                <FontAwesomeIcon title="Editar Dragão" icon={faEdit} size="2x"/>
                <FontAwesomeIcon title="Excluir Dragão" icon={faTrash} size="2x"/>
              </div>
              <time>
                <span className={Styles.day}>03</span>
                <span className={Styles.month}>07</span>
                <span className={Styles.year}>2021</span>
              </time>
              <div className={Styles.dragonInfoWrapper}>
                <h2>Nome</h2>
                <p>Bob Marley</p>
              </div>
              <div className={Styles.dragonInfoWrapper}>
                <h2>Tipo</h2>
                <p>lavender</p>
              </div>
            </div>
            <footer>Detalhes</footer>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Dragons
