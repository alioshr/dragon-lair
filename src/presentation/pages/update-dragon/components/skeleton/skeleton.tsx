import React from 'react'
import Styles from './skeleton-styles.scss'

const Skeleton: React.FC = () => {
  return (
    <React.Fragment>
      <div className={Styles.skeleton}></div>
    </ React.Fragment>
  )
}

export default Skeleton
