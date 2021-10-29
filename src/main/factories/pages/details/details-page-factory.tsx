import DetailsDragonPage from '@/presentation/pages/details/details'
import React from 'react'
import { makeRemoteGetDragon } from '../../usecases/get-dragon/remote-get-dragon-factory'

export const makeDetailsPage: React.FC = () => (
  <DetailsDragonPage
  getDragon={makeRemoteGetDragon()}
  />
)
