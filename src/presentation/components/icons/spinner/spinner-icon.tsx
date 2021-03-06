import Styles from './spinner-icon-styles.scss'

import React from 'react'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const SpinnerIcon: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? Styles.negative : ''
  return (
      <div
      {...props}
      data-testid="spinner"
      className={[Styles.spinner, negativeClass, props.className].join(' ')}
    >
      <div></div>
    </div>
  )
}

export default SpinnerIcon
