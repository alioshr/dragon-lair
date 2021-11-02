import { updateDragonState } from './atoms'
import { FormStatusBase } from '@/presentation/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const FormStatus: React.FC = () => {
  const { isLoading, mainError } = useRecoilValue(updateDragonState)
  return (
    <FormStatusBase isLoading={isLoading} mainError={mainError?.message} />
  )
}

export default FormStatus
