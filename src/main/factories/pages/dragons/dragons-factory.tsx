import { Dragons } from '@/presentation/pages'
import React from 'react'
import { makeRemoteGetDragons } from '../../usecases/get-dragons/remote-get-dragons-factory'

export const makeDragons: React.FC = () => (
  <Dragons
  getDragons={makeRemoteGetDragons()}
  />
)
