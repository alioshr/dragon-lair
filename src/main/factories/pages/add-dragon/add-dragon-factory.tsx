import { AddDragon } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAddDragon } from '@/main/factories/usecases/add-dragon/remote-add-dragon-factory'
import { makeAddDragonValidations } from './add-dragon-validation-factory'

export const makeAddDragon: React.FC = () => (
  <AddDragon
  validator={makeAddDragonValidations()}
  createDragon={makeRemoteAddDragon()}
  />
)
