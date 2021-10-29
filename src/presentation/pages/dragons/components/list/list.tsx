import React, { useContext } from 'react'
import DragonContext, { DragonStateTypes } from '@/presentation/contexts/dragon-context'
import { DragonCard } from '..'
import Skeleton from '../skeleton/skeleton'
import './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext<DragonStateTypes>(DragonContext)

  return <ul data-testid="dragons-list">
  {state.dragons.map((dragon, i) => (
    <DragonCard key={i} dragon={dragon} />
  ))}
  {state.isLoading && !state.id && (
    <Skeleton />
  )}
</ul>
}

export default List
