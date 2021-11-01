import { updateDragonState } from './atoms'
import { TextAreaBase } from '@/presentation/components'

import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  name: string
  placeholder: string
  value: string
}

const Input: React.FC<Props> = ({ name, placeholder, value }: Props) => {
  const [state, setState] = useRecoilState(updateDragonState)
  return (
    <TextAreaBase
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
      value={value}
    />
  )
}

export default Input
