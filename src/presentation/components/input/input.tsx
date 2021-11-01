import React, { useRef, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }) => {
  const inputRef = useRef<HTMLInputElement>()
  const [touched, setTouched] = useState(false)
  const error = state[`${props.name as string}Error`]
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
          setState((state: any) => ({
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
