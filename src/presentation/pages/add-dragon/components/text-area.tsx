import { addDragonState } from './atoms'
import { TextAreaBase } from '@/presentation/components'

import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(addDragonState)
  return (
    <TextAreaBase
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input
