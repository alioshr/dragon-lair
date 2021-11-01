import React from 'react'
import Styles from './dragon-form-skeleton-styles.scss'

const Skeleton: React.FC = () => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.skeleton}></div>
    </ div>
  )
}

export default Skeleton
