import React, { useContext, useRef, useState } from 'react'
import Styles from './input-styles.scss'
import FormContext, { FormStateTypes, StateTypes } from '@/presentation/contexts/form-context'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const [touched, setTouched] = useState(false)
  const { errorState, formState } = useContext<FormStateTypes>(FormContext)
  const setState = formState[1]
  const error = errorState[0][props.name as 'name' | 'password']

  return (
    <div
    data-testid={`${props.name as string}-wrapper`}
    className={Styles.inputWrapper}
    data-status={
      error && !touched
        ? 'default'
        : error && touched
          ? 'invalid'
          : 'valid'
        }
    >
      <input
        onBlur={() => !touched && setTouched(true)}
        ref={inputRef as any}
        title={error as string}
        data-testid={`${props.name as string}-input`}
        {...props}
        placeholder=" "
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
        onChange={(e) =>
          setState((state: StateTypes) => ({
            ...state,
            [e.target.name]: e.target.value
          }))}
      />
      <label
      title={error as string}
      data-testid={`${props.name as string}-label`}
      onClick={() => { (inputRef as React.MutableRefObject<HTMLInputElement>).current.focus() }}
      >{props.placeholder}
      </label>
    </div>
  )
}

export default Input
