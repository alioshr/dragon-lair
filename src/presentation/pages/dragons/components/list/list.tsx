import React, { useContext } from 'react'
import DragonContext, { DragonStateTypes } from '@/presentation/contexts/dragon-context'
import { DragonCard } from '..'
import Skeleton from '../skeleton/skeleton'
import './list-styles.scss'

type Props = {
  exclude: (id: string) => any
}

const List: React.FC<Props> = ({ exclude }) => {
  const { state } = useContext<DragonStateTypes>(DragonContext)

  return <ul data-testid="dragons-list">
  {state.dragons.map((dragon, i) => (
    <DragonCard exclude={exclude} key={i} dragon={dragon} />
  ))}
  {state.isLoading && (
    <Skeleton />
  )}
</ul>
}

export default List
