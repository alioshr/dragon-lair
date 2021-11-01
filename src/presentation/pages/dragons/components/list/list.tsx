import React from 'react'
import { DragonCard } from '..'
import Skeleton from '../skeleton/skeleton'
import './list-styles.scss'
import { useRecoilState } from 'recoil'
import { dragonListState } from '../atoms/atoms'

const List: React.FC = () => {
  const [state] = useRecoilState(dragonListState)

  return (
    <ul data-testid="dragons-list">
      {state.dragons
        .map((dragon, i) => (
          <DragonCard key={i} dragon={dragon} />
        ))}
      {state.isLoading && !state.id && <Skeleton />}
    </ul>
  )
}

export default List
