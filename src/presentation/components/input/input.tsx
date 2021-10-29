import React, { Context, useContext, useRef, useState } from 'react'
import Styles from './input-styles.scss'

type Props = {
  inputProps: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  >
  context: Context<any>
}

const Input: React.FC<Props> = ({ inputProps, context }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [touched, setTouched] = useState(false)
  const { errorState, state } = useContext<any>(context)
  const setState = state[1]
  const error = errorState[0][inputProps.name as any]

  return (
    <div
    data-testid={`${inputProps.name as string}-wrapper`}
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
        data-testid={`${inputProps.name as string}-input`}
        {...inputProps}
        placeholder=" "
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
        onChange={(e) =>
          setState((state: any) => ({
            ...state,
            [e.target.name]: e.target.value
          }))}
      />
      <label
      title={error as string}
      data-testid={`${inputProps.name as string}-label`}
      onClick={() => { (inputRef as React.MutableRefObject<HTMLInputElement>).current.focus() }}
      >{inputProps.placeholder}
      </label>
    </div>
  )
}

export default Input
