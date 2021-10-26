import React, { useRef, useState } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const [touched, setTouched] = useState(false)

  return (
    <div
    data-testid={`${props.name as string}-wrapper`}
    className={Styles.inputWrapper}
    data-status={
      true && !touched
        ? 'default'
        : touched
          ? 'invalid'
          : 'valid'
        }
    >
      <input
        onBlur={() => !touched && setTouched(true)}
        ref={inputRef as any}
        data-testid={`${props.name as string}-input`}
        {...props}
        placeholder=" "
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
      />
      <label
      data-testid={`${props.name as string}-label`}
      onClick={() => { (inputRef as React.MutableRefObject<HTMLInputElement>).current.focus() }}
      >{props.placeholder}
      </label>
    </div>
  )
}

export default Input
