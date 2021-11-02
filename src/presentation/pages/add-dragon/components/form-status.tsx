import { addDragonState } from './atoms'
import { FormStatusBase } from '@/presentation/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const FormStatus: React.FC = () => {
  const { isLoading, mainError } = useRecoilValue(addDragonState)
  return (
    <FormStatusBase isLoading={isLoading} mainError={mainError} />
  )
}

export default FormStatus
