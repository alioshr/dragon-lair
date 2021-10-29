import { UpdateDragon } from '@/presentation/pages'
import React from 'react'
import { makeRemoteGetDragon } from '../../usecases/get-dragon/remote-get-dragon-factory'
import { makeRemoteUpdateDragon } from '../../usecases/update-dragon/remote-update-dragon-factory'
import { makeUpdateDragonValidations } from './update-dragon-validation-factory'

export const makeUpdateDragon: React.FC = () => (
  <UpdateDragon
  getDragon={makeRemoteGetDragon()}
  validator={makeUpdateDragonValidations()}
  updateDragon={makeRemoteUpdateDragon()}
  />
)
