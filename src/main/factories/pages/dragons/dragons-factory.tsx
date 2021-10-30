import { DragonListSortingDecorator } from '@/main/decorators/dragon-list-sorting-decorator'
import { Dragons } from '@/presentation/pages'
import React from 'react'
import { makeRemoteExcludeDragon } from '../../usecases/exclude-dragon/remote-exclude-dragon-factory'
import { makeRemoteGetDragons } from '../../usecases/get-dragons/remote-get-dragons-factory'

export const makeDragons: React.FC = () => (
  <Dragons
  excludeDragon={makeRemoteExcludeDragon()}
  getDragons={new DragonListSortingDecorator(makeRemoteGetDragons())}
  />
)
