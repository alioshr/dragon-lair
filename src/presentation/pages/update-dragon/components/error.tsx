import { updateDragonState } from './atoms'
import { ErrorBase } from '@/presentation/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

const Error: React.FC = () => {
  const { mainError } = useRecoilValue(updateDragonState)
  return <ErrorBase error={mainError}/>
}

export default Error
