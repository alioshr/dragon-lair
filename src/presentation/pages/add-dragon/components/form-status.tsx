import { addDragonState } from './atoms'
import { FormStatusBase } from '@/presentation/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const FormStatus: React.FC = () => {
  const state = useRecoilValue(addDragonState)
  return (
    <FormStatusBase state={state} />
  )
}

export default FormStatus
