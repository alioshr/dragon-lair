import React from 'react'

const Logo: React.FC = () => {
  return (
    <img src="data:image/png;base64,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" alt="cool dragon" />
  )
}

export default Logo